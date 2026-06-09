import { useState } from 'react';
import './App.css'



function App() {
  const [data, setData] = useState(null);

  async function loadData() {
    const response = await fetch(
      'https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD?format=json&per_page=1000'
    );
    const json = await response.json();
    console.log(json[0]);
    setData(json[1]);
  }

  return (
    <div>
      <h1>Global Indicators</h1>
      <button onClick={loadData}>Load data</button>
      {data && <p>Loaded {data.length} records</p>}
    </div>
  )
}

export default App
