
const BASE_URL = 'https://api.worldbank.org/v2';


async function fetchWithRetry(url, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`World Bank API returned ${response.status}`);
        return await response.json();
      } catch (err) {
        if (i === attempts - 1) throw err; // out of tries — give up
        await new Promise((r) => setTimeout(r, 600)); // pause, then retry
      }
    }
  }

  export async function fetchIndicator(countries, indicator) {
      const url = `${BASE_URL}/country/${countries.join(';')}/indicator/${indicator}?format=json&per_page=1000`;
      const json = await fetchWithRetry(url);
      return json[1] || []; // WB wraps records in a 2-element array; data lives at [1]
  }