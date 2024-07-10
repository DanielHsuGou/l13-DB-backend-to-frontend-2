import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(null);
  const [err, setErr] = useState("");
  async function handleOnClick() {
    setErr("");
    setItems(null);
    if (inputValue) {
      const res = await fetch(`http://localhost:3001/user?email=${inputValue}`);
      const result = await res.json();
      console.log(result);
      if (result) {
        setItems(result);
      } else {
        setErr("No Such User!");
      }
    }
  }

  return (
    <div className="App">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleOnClick}>Search</button>
      {items && (
        <div>
          <div>Name: {items.name}</div>
          <div>Email: {items.email}</div>
        </div>
      )}
      {err && <div>{err}</div>}
    </div>
  );
}

export default App;
