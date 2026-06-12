

export function formatCompact(value, format) {
    let sign = "";
    let suffix = "";
    if (format === "currency") {
        sign = "$";
    }
    if (format === "percent") {
        suffix = "%";
    }
    if (format === "decimal") {
        suffix = "yrs";
    }
    if (value >= 1e12) {
        let newValue = value / 1e12;
        return `${sign}${newValue.toFixed(1)}T${suffix}`;
    } else if (value >= 1e9) {
        let newValue = value / 1e9;
        return `${sign}${newValue.toFixed(1)}B${suffix}`;
    } else if (value >= 1e6) {
        let newValue = value / 1e6;
        return `${sign}${newValue.toFixed(1)}M${suffix}`;
    } else {
        return `${sign}${value.toFixed(1)}${suffix}`;
    }
}