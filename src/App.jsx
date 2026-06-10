import { useState } from 'react';
import './App.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


function App() {
  const [data, setData] = useState(null);

  async function loadData() {
    const response = await fetch(
      'https://api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD?format=json&per_page=1000'
    );
    const json = await response.json();
    const records  = json[1].sort((a, b) => Number(a.date) - Number(b.date));
    setData(records);
  }

  return (
    <div>
      <h1>Global Indicators</h1>
      <button onClick={loadData}>Load data</button>
      {data && (
        <div>
          <ResponsiveContainer width="100%" height={400}> 
            <LineChart width={700} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
            <div>
              <p>Loaded {data.length} records</p>
              <ul>
                {data.map(record => (
                  <li key={record.date}>
                    {record.date}: {record.value}
                  </li>
                ))}
              </ul>
            </div>
        </div>
      )}
    </div>
  )
}

export default App
