import styles from './FloatingCards.module.css';

interface FloatingStatCardProps {
  icon: 'briefcase' | 'layers' | 'star';
  title: string;
  subtitle: string;
}

export default function FloatingStatCard({ icon, title, subtitle }: FloatingStatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'briefcase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.iconCyan}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'layers':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.iconCyan}>
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 12 12 17 22 12"></polyline>
            <polyline points="2 17 12 22 22 17"></polyline>
          </svg>
        );
      case 'star':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.iconCyan}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`glass-card ${styles.statCard}`}>
      <div className={styles.statHeader}>
        <h3 className={styles.statTitle}>{title}</h3>
        <div className={styles.iconWrapper}>
          {getIcon()}
        </div>
      </div>
      <p className={styles.statSubtitle}>{subtitle}</p>
    </div>
  );
}
