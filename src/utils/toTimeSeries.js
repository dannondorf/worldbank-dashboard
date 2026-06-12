

export function toTimeSeries(records) {
  const byYear = {};
  const names = [];
  for (const record of records) {
    const year = record.date;
    const countryName = record.country.value;

    if (!names.includes(countryName)) {
      names.push(countryName);
    }
    if (!byYear[year]) {
      byYear[year] = { year: year };
    }
    byYear[year][countryName] = record.value;
  }
  const rows = Object.values(byYear).sort(
    (a, b) => Number(a.year) - Number(b.year),
  );
  return { rows, names };
}