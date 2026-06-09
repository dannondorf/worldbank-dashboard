import './App.css'



function App() {
  async function loadData() {
    const response = await fetch('https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD?format=json');
    const data = await response.json();
    console.log(data);
  }
  
  return (
    <div>
      <h1>Global Indicators</h1>
      <button onClick={loadData}>Load data</button>
    </div>
  )
}

export default App
