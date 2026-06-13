import { COUNTRIES } from '../constants';


export function CountryPicker({ countries, onToggle }) {
    return (
        <div> 
            {COUNTRIES.map((c) => (
                <button
                    key={c.code}
                    value={c.code}
                    onClick={() => onToggle(c.code)}
                    style={{
                        fontWeight: countries.includes(c.code) ? "bold" : "normal",
                        backgroundColor: countries.includes(c.code) ? "#007bff" : "#d28e0f",
                        border: "1px solid #007bff",
                        padding: "5px 10px",
                        margin: "5px",
                    }}
                >
                    {c.name}
                </button>
            ))}
        </div>
    );
}