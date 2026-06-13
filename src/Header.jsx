import styles from './Header.module.css';


export function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <div className={styles.mark}>
                    MacroLens<span className={styles.dot}>.</span>
                </div>
                <div className={styles.tag}>Global Economic Indicators</div>
            </div>
            <div className={styles.meta}><span className={styles.pulse}></span> WORLD BANK · LIVE · 1990–2023</div>
        </header>
    )
}