import { useState, useEffect } from "react";
import { useWorldBankData } from "./hooks/useWorldBankData";
import { INDICATORS } from './constants';
import { CountryPicker } from "./components/CountryPicker";
import { IndicatorSelect } from "./components/IndicatorSelect";
import { DataChart } from "./components/DataChart";

function App() {
  const [countries, setCountries] = useState([]);
  const [indicator, setIndicator] = useState("NY.GDP.MKTP.CD");
  const currentIndicator = INDICATORS.find((i) => i.code === indicator);
  const { data, countryNames, loading, error } = useWorldBankData(countries, indicator);
  
  function toggleCountry(code) {
    setCountries((existing) =>
      existing.includes(code)
        ? existing.filter((c) => c !== code)
        : [...existing, code],
    );
  }
  
  return (
    <div>
      <h1>Global Indicators</h1>
      <CountryPicker 
        countries={countries} 
        onToggle={toggleCountry} 
      />
      <IndicatorSelect 
        indicator={indicator} 
        onChange={setIndicator} 
      /> 
      <DataChart
        data={data}
        countryNames={countryNames}
        loading={loading}
        error={error}
        format={currentIndicator.format}
      />
    </div>
  );
}

export default App;
