import { INDICATORS } from "../constants";

export function IndicatorSelect({ indicator, onChange }) {
    return(
        <select
            value={indicator}
            onChange={(event) => onChange(event.target.value)}
        >
            {INDICATORS.map((i) => (
                <option key={i.code} value={i.code}>
                    {i.label}
                </option>
                ))
            }
        </select>
        );
}