import styles from './AboutExpertise.module.css';

interface SkillBarProps {
  name: string;
  percentage: number;
}

export default function SkillBar({ name, percentage }: SkillBarProps) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillInfo}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPercentage}>{percentage}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${percentage}%` }}
        >
          <div className={styles.progressGlow}></div>
        </div>
      </div>
    </div>
  );
}
