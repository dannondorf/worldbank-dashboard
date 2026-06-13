import { COUNTRIES } from '../constants';
import styles from './CountryPicker.module.css';

export function CountryPicker({ countries, onToggle }) {
    return (
        <div className={styles.chips}> 
            {COUNTRIES.map((c) => (
                <button
                    key={c.code}
                    className={styles.chip}
                    aria-pressed={countries.includes(c.code)}
                    style={{ '--ck' : c.color}}
                    value={c.code}
                    onClick={() => onToggle(c.code)}
                >
                    <span className={styles.swatch}></span>
                    {c.name}
                </button>
            ))}
        </div>
    );
}