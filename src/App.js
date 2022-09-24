import { useEffect, useState } from "react";
import Select from "react-select";
import "./App.css";

function App() {
  const [datas, setDatas] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getBerries = async () => {
    const berries = await fetch("https://pokeapi.co/api/v2/berry/");
    const value = await berries.json();
    const result = value.results.map((data) => {
      return {
        label: data.name,
        value: data.name,
      };
    });

    setDatas(result.sort((a, b) => a.label.localeCompare(b.label)));
  };

  useEffect(() => {
    getBerries();
  }, []);

  const handleSubmit = () => {
    setIsShow((state) => !state);
  };

  const handleChange = (value) => {
    setUserSelect(value);
  };
  return (
    <div className="App">
      <h1> {isShow ? userSelect : ""}</h1>
      <button onClick={() => handleSubmit()} disabled={!userSelect}>
        {isShow ? "hide button" : "Show Values"}
      </button>
      <Select options={datas} onChange={(e) => handleChange(e.value)} />
    </div>
  );
}

export default App;
