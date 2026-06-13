import { INDICATORS } from '../constants';
import styles from './IndicatorSelect.module.css';

export function IndicatorSelect({ indicator, onChange }) {
  return (
    <div className={styles.indicatorWrap}>
      <select
        className={styles.indicator}
        value={indicator}
        onChange={(e) => onChange(e.target.value)}
      >
        {INDICATORS.map((i) => (
          <option key={i.code} value={i.code}>{i.label}</option>
        ))}
      </select>
    </div>
  );
}