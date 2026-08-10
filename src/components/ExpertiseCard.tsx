import styles from './AboutExpertise.module.css';
import SkillBar from './SkillBar';

export default function ExpertiseCard() {
  const skills = [
    { name: 'C / C++ / JavaScript', percentage: 90 },
    { name: 'Python', percentage: 80 },
    { name: 'Web Development', percentage: 85 },
    { name: 'Embedded Systems', percentage: 75 },
    { name: 'IoT Development', percentage: 80 },
    { name: 'UI/UX Design', percentage: 70 },
  ];

  return (
    <div className={`glass-card ${styles.card}`}>
      <div className={styles.cardHeader}>
        <div className={styles.headerIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <h2 className={styles.cardTitle}>My Expertise</h2>
      </div>
      
      <div className={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <SkillBar 
            key={index} 
            name={skill.name} 
            percentage={skill.percentage} 
          />
        ))}
      </div>
    </div>
  );
}
