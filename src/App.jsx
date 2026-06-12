import { useState, useEffect } from 'react';
import './App.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COUNTRIES = [
  { code: 'USA', name: 'United States' },
  { code: 'CHN', name: 'China' },
  { code: 'JPN', name: 'Japan' },
  { code: 'DEU', name: 'Germany' },
  { code: 'IND', name: 'India' },
];

const INDICATORS = [
  { code: 'NY.GDP.MKTP.CD', label: 'GDP (current US$)', format: 'currency' },
  { code: 'SP.POP.TOTL', label: 'Population, total', format: 'number' },
  { code: 'SP.DYN.LE00.IN', label: 'Life expectancy (years)', format: 'decimal' },
  { code: 'FP.CPI.TOTL.ZG', label: 'Inflation (annual %)', format: 'percent' },
];

function formatCompact(value, format) { 
  let sign = '';
  let suffix = '';
  if (format === 'currency'){
     sign = '$';
  } 
  if (format === 'percent') {
    suffix = '%'
  }
  if (format === 'decimal') {
    suffix = 'yrs';
  }  
  if(value >= 1e12) {
      let newValue = value/1e12; 
      return `${sign}${newValue.toFixed(1)}T${suffix}`;
  } else if(value >= 1e9) {
      let newValue = value/1e9; 
      return `${sign}${newValue.toFixed(1)}B${suffix}`;
  } else if(value >= 1e6) {
      let newValue = value/1e6; 
      return `${sign}${newValue.toFixed(1)}M${suffix}`;
  } else {
      return `${sign}${value.toFixed(1)}${suffix}`;
  }  
};

function toTimeSeries(records) {
  const byYear = {};
  const names = [];
  for (const record of records) {
    const year = record.date;
    const countryName = record.country.value;
  
    if (!names.includes(countryName)){
      names.push(countryName);
    }
    if (!byYear[year]) {
      byYear[year] = { year: year};
    }
    byYear[year][countryName] = record.value;
  }
  const rows = Object.values(byYear).sort((a, b) => Number(a.year) - Number(b.year));
  return {rows, names};
}



function App() {
  const [countries, setCountries] = useState(['USA']);
  const [data, setData] = useState([]);
  const [indicator, setIndicator] = useState('NY.GDP.MKTP.CD');
  const currentIndicator = INDICATORS.find((i) => i.code === indicator);

  function toggleCountry(code) {
    setCountries((existing) => 
      existing.includes(code)
        ? existing.filter((c) => c !== code)
        : [...existing, code]
    );
  }

  useEffect(() => {
    if (countries.length === 0) {
      setData([]);
      return;
    }
      async function loadData() {
        const response = await fetch(
          `https://api.worldbank.org/v2/country/${countries.join(';')}/indicator/${indicator}?format=json&per_page=1000`
        );
        const json = await response.json();
        const records  = toTimeSeries(json[1]);
        console.log(records);
        setData(records);
      }
      loadData();
    }, [countries, indicator])
  
    
  return (
    <div>
      <h1>Global Indicators</h1>
      {COUNTRIES.map((c) => (
      <button 
        key={c.code} 
        value={c.code}
        onClick={() => toggleCountry(c.code)}
        style={{fontWeight: countries.includes(c.code) ? 'bold' : 'normal', backgroundColor: countries.includes(c.code) ? '#007bff' : '#d28e0f', border: '1px solid #007bff', padding: '5px 10px', margin: '5px'}}
      >
        {c.name}
      </button>
      ))}
      <select value={indicator} onChange={(event) => setIndicator(event.target.value)}>
        {INDICATORS.map((i) => (
        <option key={i.code} value={i.code}>
          {i.label}
        </option>
      ))}
      </select>
     
        <div style={{position: "relative", paddingTop: "20px", paddingRight: "60px"}}>
          <ResponsiveContainer width="100%" height={400}> 
            <LineChart data={data} >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => formatCompact(value, currentIndicator.format)} />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          {countries.length === 0 && (
          <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center",alignItems: "center", fontSize: "1.5em", color: "#888", paddingBottom: "30px" }}>
          Click a country to begin
          </div>
        )}
      </div>
    </div>
  )
}

export default App
