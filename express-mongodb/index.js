const express = require('express')
const app = express()
require("dotenv").config()
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors")


app.use(cors());
app.use(express.json()) // middleware
const PORT = process.env.PORT
const URI = process.env.URI;

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function users() {
    try {
        await client.connect(); // connect backend to mongodb
        const db = client.db("sample_mflix")
        const userResult = await db.collection('users').findOne({ name: 'Joey Chan' })
        return userResult
    } catch (err) {
        console.dir
    } finally {
        await client.close();
    }
}

async function usersPost(email) {
  try {
    await client.connect(); // connect backend to mongodb
      const db = client.db("sample_mflix");
      
    const options = { projection: { _id: 0, name: 1, email: 1 } };
    const userResult = await db
      .collection("users")
          .findOne({ email: email }, options);
      
    console.log(userResult);
      return userResult;
      
  } catch (err) {
    console.dir;
  } finally {
    await client.close();
  }
}

async function usersAdd(item) {
    try {
        await client.connect(); // connect backend to mongodb
        const db = client.db("sample_mflix");

        const userResult = await db.collection("users").insertOne(item);

        console.log(userResult);
        return userResult;

    } catch (err) {
      console.dir;
    } finally {
      await client.close();
    }
}

app.get("/", async (req, res) => {
    const data = await users()
    res.send(data);
    res.json({
        name: data.name,
        email: data.email,
    })
});

// http://localhost:3001/user?email=Joeychan@generation.org
app.get("/user", async (req, res) => {
    console.log('query: ', req.query)
    const { email } = req.query
  const data = await usersPost(email);
  res.json(data)
});

app.post("/user", async (req, res) => {
    console.log("body", req.body)
    const email = req.body.email;
    const data = await usersPost(email);
    res.json(data)
});

app.post("/post", async (req, res) => {
  console.log("body", req.body);
    const item = req.body;
  const data = await usersAdd(item);
  res.json(data);
});

app.listen(PORT, () => {
    console.log(`The app is listening to port ${PORT}`)
})

