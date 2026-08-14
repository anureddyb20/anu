'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SkillsSection.module.css';

export interface SkillCategoryData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  skills: string[];
}

const CATEGORIES: SkillCategoryData[] = [
  {
    id: 'frontend',
    name: 'FRONTEND',
    subtitle: 'Web Interfaces',
    description: 'Building responsive and interactive web experiences.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS']
  },
  {
    id: 'backend',
    name: 'BACKEND',
    subtitle: 'API & Data',
    description: 'Developing APIs, databases and connected application systems.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Supabase', 'PostgreSQL', 'Firebase']
  },
  {
    id: 'hardware',
    name: 'HARDWARE & IoT',
    subtitle: 'Embedded Systems',
    description: 'Building embedded systems and connected hardware solutions.',
    skills: ['Arduino', 'ESP32', 'IoT', 'Embedded Systems', 'Sensors', 'Hardware Prototyping']
  },
  {
    id: 'tools',
    name: 'TOOLS & DESIGN',
    subtitle: 'Workflow & UI',
    description: 'Designing, deploying and managing modern digital products.',
    skills: ['Git', 'GitHub', 'Vercel', 'Figma', 'Canva', 'UI/UX Design']
  }
];

export default function SkillsSection() {
  const [activeId, setActiveId] = useState<string>('frontend');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const activeCategory = CATEGORIES.find((c) => c.id === activeId) || CATEGORIES[0];
  const nonActiveCategories = CATEGORIES.filter((c) => c.id !== activeId);

  // Screen width detection for responsive orbit radius
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous smooth orbit animation
  const lastTimeRef = useRef<number>(0);
  useEffect(() => {
    let animId: number;
    const animate = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = time - lastTimeRef.current;
        // Slow speed when hovered, normal continuous speed when unhovered
        const speed = isHovered ? 0.003 : 0.012; 
        setOrbitAngle((prev) => (prev + delta * speed) % 360);
      }
      lastTimeRef.current = time;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  // Satellite positions around the center
  const getSatellitePosition = (index: number) => {
    if (isMobile) {
      const mobilePositions = [
        { x: 0, y: -200 },     // Top
        { x: 135, y: 135 },    // Bottom Right
        { x: -135, y: 135 }    // Bottom Left
      ];
      return mobilePositions[index % mobilePositions.length];
    }
    const desktopPositions = [
      { x: 0, y: -250 },       // Top
      { x: 250, y: 145 },      // Bottom Right
      { x: -250, y: 145 }      // Bottom Left
    ];
    return desktopPositions[index % desktopPositions.length];
  };

  return (
    <section className={styles.skills} id="skills">
      {/* ── Section Header ── */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot}></span>
          Technology Ecosystem
        </div>
        <h2 className={styles.heading}>
          Skills & <span className={styles.highlight}>Technologies</span>
        </h2>
        <p className={styles.subtitle}>
          Technologies I use to turn ideas into real-world products. Click any category wheel to explore its ecosystem.
        </p>
      </div>

      {/* ── Interactive Technology Orbit System ── */}
      <div 
        className={styles.orbitSystem}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredSkill(null);
        }}
      >
        {/* Outer Orbit Decorative Ring */}
        <div className={styles.outerOrbitRing}></div>

        {/* ── 1. CENTRAL ACTIVE WHEEL ── */}
        <div className={styles.centralWheel}>
          <h3 className={styles.categoryTitle}>{activeCategory.name}</h3>
          <span className={styles.categorySubtitle}>{activeCategory.subtitle}</span>
          <p className={styles.categoryDesc}>{activeCategory.description}</p>
        </div>

        {/* ── 2. ORBITING SKILL NODES (Active Category) ── */}
        {activeCategory.skills.map((skill, idx) => {
          const totalSkills = activeCategory.skills.length;
          const orbitRadius = isMobile ? 135 : 205;
          const baseAngle = (idx * 360) / totalSkills;
          const currentAngle = (baseAngle + orbitAngle) % 360;
          const rad = (currentAngle * Math.PI) / 180;
          
          const x = Math.cos(rad) * orbitRadius;
          const y = Math.sin(rad) * orbitRadius;
          const isSkillHovered = hoveredSkill === skill;

          return (
            <div
              key={skill}
              className={styles.skillNode}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0)`
              }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div 
                className={`${styles.skillPill} ${isSkillHovered ? styles.skillPillActive : ''}`}
                tabIndex={0}
                aria-label={`Skill: ${skill}`}
              >
                <span className={styles.skillDot}></span>
                <span>{skill}</span>
              </div>
            </div>
          );
        })}

        {/* ── 3. SURROUNDING SATELLITE CATEGORY WHEELS ── */}
        {nonActiveCategories.map((category, idx) => {
          const pos = getSatellitePosition(idx);

          return (
            <button
              key={category.id}
              className={styles.satelliteWheel}
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
              }}
              onClick={() => setActiveId(category.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveId(category.id);
                }
              }}
              tabIndex={0}
              aria-label={`Activate category: ${category.name}`}
              role="button"
            >
              <span className={styles.satelliteTitle}>{category.name}</span>
              <span className={styles.satelliteIndicator}>Click to view</span>
            </button>
          );
        })}

      </div>
    </section>
  );
}
