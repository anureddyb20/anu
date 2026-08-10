import styles from './FloatingCards.module.css';

export default function FloatingCodeCard() {
  return (
    <div className={`glass-card ${styles.codeCard}`}>
      <div className={styles.codeHeader}>
        <div className={styles.codeIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <div className={styles.codeContent}>
          <div className={styles.codeItem}>Software</div>
          <div className={styles.codeItem}>Electronics</div>
          <div className={styles.codeItem}>IoT & Embedded</div>
        </div>
        <div className={styles.codeStatus}></div>
      </div>
    </div>
  );
}
