import styles from './AboutExpertise.module.css';

export default function AboutCard() {
  return (
    <div className={`glass-card ${styles.card}`}>
      <div className={styles.cardHeader}>
        <div className={styles.headerIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2 className={styles.cardTitle}>About Me</h2>
      </div>
      
      <p className={styles.aboutText}>
        I'm an engineering student with a strong interest in software development, 
        embedded systems, IoT and electronics. I love turning ideas into real-world 
        solutions and constantly exploring new technologies.
      </p>
      
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <div className={styles.infoIconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <div className={styles.infoLabel}>Name</div>
            <div className={styles.infoValue}>Anu Reddy B</div>
          </div>
        </div>
        
        <div className={styles.infoItem}>
          <div className={styles.infoIconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div>
            <div className={styles.infoLabel}>Location</div>
            <div className={styles.infoValue}>Mysuru, Karnataka, India</div>
          </div>
        </div>
        
        <div className={styles.infoItem}>
          <div className={styles.infoIconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div>
            <div className={styles.infoLabel}>Email</div>
            <div className={styles.infoValue}>anureddyb@example.com</div>
          </div>
        </div>
        
        <div className={styles.infoItem}>
          <div className={styles.infoIconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <div className={styles.infoLabel}>Availability</div>
            <div className={styles.infoValueStatus}>
              <span className={styles.statusDotSmall}></span>
              Open to Opportunities
            </div>
          </div>
        </div>
      </div>
      
      <a href="#about" className={styles.moreBtn}>
        More About Me
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </a>
    </div>
  );
}
