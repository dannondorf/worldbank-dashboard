import { useState } from 'react';
import './App.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COUNTRIES = [
  { code: 'USA', name: 'United States' },
  { code: 'CHN', name: 'China' },
  { code: 'JPN', name: 'Japan' },
  { code: 'DEU', name: 'Germany' },
  { code: 'IND', name: 'India' },
];

function formatCompact(value) { 
  if(value >= 1e12) {
      let newValue = value/1e12; 
      return `$${newValue.toFixed(1)}T`;
  } else if(value >= 1e9) {
      let newValue = value/1e9; 
      return `$${newValue.toFixed(1)}B`;
  } else if(value >= 1e6) {
      let newValue = value/1e6; 
      return `$${newValue.toFixed(1)}M`;
  } else {
      return `$${value}`;
  }  
};

function App() {
  const [country, setCountry] = useState(country);
  setCountry(COUNTRIES[0]);

  const [data, setData] = useState(null);
  async function loadData() {
    const response = await fetch(
      'https://api.worldbank.org/v2/country/`{$country.code}`/indicator/NY.GDP.MKTP.CD?format=json&per_page=1000'
    );
    const json = await response.json();
    const records  = json[1].sort((a, b) => Number(a.date) - Number(b.date));
    setData(records);
  }

  return (
    <div>
      <h1>Global Indicators</h1>
      <button onClick={loadData}>Load data</button>
      {country && (
        <select value={COUNTRIES}>{COUNTRIES.map(country => (
          <option key={country.code}>{country.name}</option>))}
        </select>)
      }
      {data && (
        <div>
          <ResponsiveContainer width="100%" height={400}> 
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={formatCompact} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
            <div>
              <p>Loaded {data.length} records</p>
              {/* <ul>
                {data.map(record => (
                  <li key={record.date}>
                    {record.date}: {record.value}
                  </li>
                ))}
              </ul> */}
            </div>
        </div>
      )}
    </div>
  )
}

export default App
