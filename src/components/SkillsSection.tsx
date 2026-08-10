import Image from 'next/image';
import styles from './SkillsSection.module.css';

interface SkillCategory {
  title: string;
  skills: string[];
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Languages & Core",
      skills: ["C", "C++", "Python", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Frameworks & Frontend",
      skills: ["React", "Next.js", "Express", "Node.js", "Tailwind CSS"]
    },
    {
      title: "Backend, Database & IoT",
      skills: ["Supabase", "PostgreSQL", "Firebase", "Arduino", "IoT"]
    },
    {
      title: "Tools, Platforms & Design",
      skills: ["Git", "GitHub", "Vercel", "Figma", "Canva"]
    }
  ];

  return (
    <section className={styles.skills} id="skills">
      <div className="container">
        <div className={styles.layout}>
          
          {/* ── Left Column: Robotic Hand asset holding floating logos ── */}
          <div className={styles.imageCol}>
            <div className={styles.handContainer}>
              <div className={styles.glowOverlay}></div>
              <Image
                src="/robotic-hand.png"
                alt="Robotic Hand holding React, JS, Node and Arduino logos"
                width={500}
                height={400}
                className={styles.handImg}
                priority
                unoptimized
              />
            </div>
          </div>

          {/* ── Right Column: Categorized Skills ── */}
          <div className={styles.skillsCol}>
            <h2 className={styles.heading}>
              My <span className={styles.highlight}>Skills</span>
            </h2>
            
            <div className={styles.grid}>
              {skillCategories.map((category, idx) => (
                <div key={idx} className={`glass-card ${styles.categoryCard}`}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <div className={styles.badgeWrapper}>
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={styles.skillBadge}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
