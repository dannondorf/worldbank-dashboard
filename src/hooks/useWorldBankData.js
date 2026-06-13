import { useState, useEffect } from 'react';
import { fetchIndicator } from '../api/worldBank';
import { toTimeSeries } from '../utils/toTimeSeries';


export function useWorldBankData(countries, indicator) {
    const [countryNames, setCountryNames] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() =>{
        if (countries.length === 0) {
            setData([]);
            setCountryNames([]);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const timer = setTimeout(() => {
            setLoading(true);
            setError(null);

            async function loadData() {
            try {
                const records =  await fetchIndicator(countries, indicator);
                if (cancelled) return;
                const { rows, names } = toTimeSeries(records);
                setData(rows);
                setCountryNames(names);
            } catch (err) {
                if (!cancelled)
                setError(
                    "Could not load data — the World Bank service may be busy. Try again in a moment.",
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
            }
            loadData();
        }, 400);

        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [countries, indicator]);

    return { data, countryNames, loading, error };

}