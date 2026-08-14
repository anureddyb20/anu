'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SkillsSection.module.css';

export interface DomainData {
  id: string;
  counter: string;
  name: string;
  subtitle: string;
  description: string;
  skills: string[];
}

const DOMAINS: DomainData[] = [
  {
    id: 'frontend',
    counter: '01 / 04',
    name: 'FRONTEND',
    subtitle: 'Web Interfaces',
    description: 'Building responsive and interactive web experiences.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS']
  },
  {
    id: 'backend',
    counter: '02 / 04',
    name: 'BACKEND',
    subtitle: 'API & Data',
    description: 'Developing APIs, databases and connected application systems.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Supabase', 'PostgreSQL', 'Firebase']
  },
  {
    id: 'hardware',
    counter: '03 / 04',
    name: 'HARDWARE & IoT',
    subtitle: 'Embedded Systems',
    description: 'Building embedded systems and connected hardware solutions.',
    skills: ['Arduino', 'ESP32', 'IoT', 'Embedded Systems', 'Sensors', 'Hardware Prototyping']
  },
  {
    id: 'tools',
    counter: '04 / 04',
    name: 'TOOLS & DESIGN',
    subtitle: 'Workflow & UI',
    description: 'Designing, deploying and managing modern digital products.',
    skills: ['Git', 'GitHub', 'Vercel', 'Figma', 'Canva', 'UI/UX Design']
  }
];

export default function SkillsSection() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('frontend');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const activeDomain = DOMAINS.find((d) => d.id === selectedId) || DOMAINS[0];

  // Screen size check for mobile orbit scaling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous Orbit Rotation Loop
  const lastTimeRef = useRef<number>(0);
  useEffect(() => {
    let animId: number;
    const animate = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = time - lastTimeRef.current;
        const speed = isHovered ? 0.003 : 0.012;
        setOrbitAngle((prev) => (prev + delta * speed) % 360);
      }
      lastTimeRef.current = time;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleDomainSelect = (id: string) => {
    setSelectedId(id);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  // Positions for Stage 1 initial circular ecosystem
  const getInitialPosition = (index: number) => {
    const radius = isMobile ? 140 : 190;
    const angles = [-90, 0, 90, 180]; // Top, Right, Bottom, Left
    const rad = (angles[index % 4] * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius
    };
  };

  return (
    <section className={styles.skills} id="skills">
      {/* ── Section Header ── */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot}></span>
          Technical Ecosystem
        </div>
        <h2 className={styles.heading}>
          EXPLORE MY <span className={styles.highlight}>TECHNICAL ECOSYSTEM</span>
        </h2>
        <p className={styles.subtitle}>
          Select a domain to explore the technologies I use to build.
        </p>
      </div>

      {/* ============================================================
          STAGE 1: INITIAL CENTRALISED ECOSYSTEM VIEW
         ============================================================ */}
      {!isExpanded ? (
        <div className={styles.initialEcosystem}>
          {/* Central Instruction Node */}
          <div className={styles.centerPromptNode}>
            <span className={styles.centerPromptText}>Select a domain to explore</span>
            <svg 
              className={styles.centerPromptIcon} 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="7 13 12 18 17 13"></polyline>
              <polyline points="7 6 12 11 17 6"></polyline>
            </svg>
          </div>

          {/* 4 Circular Domain Nodes */}
          {DOMAINS.map((domain, idx) => {
            const pos = getInitialPosition(idx);
            return (
              <button
                key={domain.id}
                className={styles.initialDomainNode}
                style={{
                  transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
                }}
                onClick={() => handleDomainSelect(domain.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDomainSelect(domain.id);
                  }
                }}
                tabIndex={0}
                aria-label={`Explore domain: ${domain.name}`}
                role="button"
              >
                <h3 className={styles.initialDomainTitle}>{domain.name}</h3>
                <span className={styles.initialDomainExplore}>Click to explore</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* ============================================================
            STAGE 2: SPLIT-SCREEN EXPLORER VIEW
           ============================================================ */
        <div className={styles.explorerContainer}>
          
          {/* ── LEFT SIDE: CATEGORY NAVIGATOR ── */}
          <div className={styles.leftNavigator}>
            <span className={styles.navigatorHeading}>Select Domain</span>
            {DOMAINS.map((domain) => {
              const isActive = domain.id === selectedId;
              return (
                <button
                  key={domain.id}
                  className={`${styles.categoryNavItem} ${isActive ? styles.categoryNavItemActive : ''}`}
                  onClick={() => handleDomainSelect(domain.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleDomainSelect(domain.id);
                    }
                  }}
                  tabIndex={0}
                  aria-selected={isActive}
                  aria-label={`Select ${domain.name}`}
                  role="button"
                >
                  <div className={styles.categoryNodeCircle}>
                    {domain.counter.split(' ')[0]}
                  </div>
                  <div className={styles.categoryNavText}>
                    <span className={styles.categoryNavTitle}>{domain.name}</span>
                    <span className={styles.categoryNavSubtitle}>{domain.subtitle}</span>
                  </div>
                  {isActive && <span className={styles.activeBadge}>ACTIVE</span>}
                </button>
              );
            })}
          </div>

          {/* ── CONNECTING ANIMATED SIGNAL PATH (Desktop Only) ── */}
          {!isMobile && (
            <svg className={styles.connectorLineContainer} width="100%" height="100%">
              <path
                d="M 320 280 Q 400 280, 520 280"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.5"
                className={styles.pulsePath}
              />
            </svg>
          )}

          {/* ── RIGHT SIDE: SELECTED CATEGORY TECHNOLOGY ORBIT ── */}
          <div
            className={styles.rightOrbitSystem}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setHoveredSkill(null);
            }}
          >
            {/* Orbit Path Ring */}
            <div className={styles.orbitPathRing}></div>

            {/* Central Selected Domain Node */}
            <div className={styles.centerDomainNode}>
              <span className={styles.domainCounter}>{activeDomain.counter}</span>
              <h3 className={styles.domainName}>{activeDomain.name}</h3>
              <span className={styles.domainSubtitle}>{activeDomain.subtitle}</span>
              <p className={styles.domainDesc}>{activeDomain.description}</p>
            </div>

            {/* Orbiting Technology Nodes */}
            {activeDomain.skills.map((skill, idx) => {
              const total = activeDomain.skills.length;
              const radius = isMobile ? 135 : 195;
              const baseAngle = (idx * 360) / total;
              const currentAngle = (baseAngle + orbitAngle) % 360;
              const rad = (currentAngle * Math.PI) / 180;
              
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
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
                    aria-label={`Technology: ${skill}`}
                  >
                    <span className={styles.skillDot}></span>
                    <span>{skill}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </section>
  );
}
