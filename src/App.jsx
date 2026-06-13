import { useState } from "react";
import { useWorldBankData } from "./hooks/useWorldBankData";
import { INDICATORS } from './constants';
import { CountryPicker } from "./components/CountryPicker";
import { IndicatorSelect } from "./components/IndicatorSelect";
import { DataChart } from "./components/DataChart";
import { Header } from "./Header";
import styles from './App.module.css';


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
      <div className={styles.shell}>
        <Header />
        <div className={styles.controls}>
          <CountryPicker countries={countries} onToggle={toggleCountry} />
          <IndicatorSelect indicator={indicator} onChange={setIndicator} />
        </div>
        <DataChart
          data={data} countryNames={countryNames} loading={loading} error={error}
          format={currentIndicator.format}
          label={currentIndicator.label}
        />
      </div>
  );
}

export default App;
