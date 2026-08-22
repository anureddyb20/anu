'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './SkillsSection.module.css';

export interface DomainData {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  skills: string[];
}

const DOMAINS: DomainData[] = [
  {
    id: 'frontend',
    name: 'FRONTEND',
    subtitle: 'Web Interfaces',
    description: 'Building responsive and interactive web experiences.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS']
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
  },
  {
    id: 'backend',
    name: 'BACKEND',
    subtitle: 'API & Data',
    description: 'Developing APIs, databases and connected application systems.',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Supabase', 'PostgreSQL', 'Firebase']
  }
];

export default function SkillsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const activeDomain = DOMAINS.find((d) => d.id === selectedId) || null;

  // Responsive screen size listener
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 768) {
        setScreenType('mobile');
      } else if (w <= 950) {
        setScreenType('tablet');
      } else {
        setScreenType('desktop');
      }
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

  const handleDomainClick = (id: string) => {
    setSelectedId(id);
  };

  const handleResetEcosystem = () => {
    setSelectedId(null);
    setHoveredSkill(null);
  };

  // Mathematical 2D Tangent Placement (0 gap between circles)
  const getCirclePosition = (domainId: string) => {
    // ── STATE 1: Initial Balanced Tangent Ecosystem (selectedId === null) ──
    if (selectedId === null) {
      if (screenType === 'mobile') {
        // Radius 60px, Diameter 120px. Distance d = 60 * sqrt(2) = 84.85px
        return (
          {
            frontend: { x: 0, y: -84.85 },
            hardware: { x: 84.85, y: 0 },
            tools: { x: 0, y: 84.85 },
            backend: { x: -84.85, y: 0 }
          }[domainId] || { x: 0, y: 0 }
        );
      }

      if (screenType === 'tablet') {
        // Radius 70px, Diameter 140px. Distance d = 70 * sqrt(2) = 98.99px
        return (
          {
            frontend: { x: 0, y: -98.99 },
            hardware: { x: 98.99, y: 0 },
            tools: { x: 0, y: 98.99 },
            backend: { x: -98.99, y: 0 }
          }[domainId] || { x: 0, y: 0 }
        );
      }

      // Desktop: Radius 85px, Diameter 170px. Distance d = 85 * sqrt(2) = 120.21px
      return (
        {
          frontend: { x: 0, y: -120.21 },
          hardware: { x: 120.21, y: 0 },
          tools: { x: 0, y: 120.21 },
          backend: { x: -120.21, y: 0 }
        }[domainId] || { x: 0, y: 0 }
      );
    }

    // ── STATE 2: Category Selected ──
    // Active Selected Domain -> Travels to RIGHT side (or BOTTOM on Mobile)
    if (domainId === selectedId) {
      if (screenType === 'mobile') return { x: 0, y: 90 };
      if (screenType === 'tablet') return { x: 180, y: 0 };
      return { x: 230, y: 0 };
    }

    // Inactive Domains -> Sit in deterministic tangent stack with ZERO gap
    const inactiveDomainIds = DOMAINS.filter((d) => d.id !== selectedId).map((d) => d.id);
    const indexInInactive = inactiveDomainIds.indexOf(domainId); // 0, 1, or 2

    if (screenType === 'mobile') {
      // Top horizontal row: y = -150px. Inactive diameter = 90px. Centers at -90, 0, +90
      const xPos = (indexInInactive - 1) * 90;
      return { x: xPos, y: -150 };
    }

    if (screenType === 'tablet') {
      // Left vertical column: x = -200px. Inactive diameter = 120px. Centers at -120, 0, +120
      const yPos = (indexInInactive - 1) * 120;
      return { x: -200, y: yPos };
    }

    // Desktop: Left vertical column: x = -240px. Inactive diameter = 140px. Centers at -140, 0, +140
    const yPos = (indexInInactive - 1) * 140;
    return { x: -240, y: yPos };
  };

  return (
    <section className={styles.skills} id="skills">
      {/* ── Section Header ── */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot}></span>
          Pure Circular Ecosystem
        </div>
        <h2 className={styles.heading}>
          TECHNICAL <span className={styles.highlight}>ECOSYSTEM EXPLORER</span>
        </h2>
        <p className={styles.subtitle}>
          {selectedId === null 
            ? 'Select a domain circle to expand its interactive technology orbit.'
            : 'Exploring selected domain. Click any circular node on the left to switch or reset below.'}
        </p>
      </div>

      {/* ── Reset Ecosystem Control (visible when a category is expanded) ── */}
      {selectedId !== null && (
        <button
          className={styles.resetControl}
          onClick={handleResetEcosystem}
          aria-label="Reset to full circular ecosystem"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Reset Ecosystem
        </button>
      )}

      {/* ── PURE CIRCULAR STAGE CONTAINER ── */}
      <div 
        className={styles.ecosystemStage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredSkill(null);
          setHoveredDomainId(null);
        }}
      >
        {/* Central Prompt Core Node (State 1 Initial Ecosystem - Tangent to all 4 circles) */}
        <div 
          className={styles.centerPromptNode}
          style={{
            opacity: selectedId === null ? 1 : 0,
            pointerEvents: selectedId === null ? 'auto' : 'none',
            transform: selectedId === null ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.4)'
          }}
        >
          <span className={styles.centerPromptTag}>EXPLORE</span>
          <svg 
            className={styles.centerPromptIcon} 
            xmlns="http://www.w3.org/2000/svg" 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="7 13 12 18 17 13"></polyline>
            <polyline points="7 6 12 11 17 6"></polyline>
          </svg>
        </div>

        {/* Orbit Path Ring for Expanded System (State 2) */}
        {selectedId !== null && (
          <div 
            className={styles.orbitRingPath}
            style={{
              transform: screenType === 'mobile' 
                ? 'translate(-50%, calc(-50% + 90px))' 
                : screenType === 'tablet'
                  ? 'translate(calc(-50% + 180px), -50%)'
                  : 'translate(calc(-50% + 230px), -50%)'
            }}
          ></div>
        )}

        {/* ── 100% PURE CIRCULAR DOMAIN NODES ── */}
        {DOMAINS.map((domain) => {
          const isSelected = domain.id === selectedId;
          const isHoveredDomain = hoveredDomainId === domain.id && !isSelected;
          const pos = getCirclePosition(domain.id);
          const scale = isHoveredDomain ? 1.06 : 1;

          let circleClass = styles.domainCircleInactive;
          if (isSelected) {
            circleClass = styles.domainCircleActive;
          } else if (selectedId !== null) {
            circleClass = styles.domainCircleInactiveCondensed;
          }

          return (
            <button
              key={domain.id}
              className={`${styles.domainCircle} ${circleClass}`}
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`
              }}
              onClick={() => handleDomainClick(domain.id)}
              onMouseEnter={() => setHoveredDomainId(domain.id)}
              onMouseLeave={() => setHoveredDomainId(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleDomainClick(domain.id);
                }
              }}
              tabIndex={0}
              aria-selected={isSelected}
              aria-label={`Domain: ${domain.name}`}
              role="button"
            >
              <h3 className={styles.domainTitle}>{domain.name}</h3>
              
              {isSelected ? (
                <>
                  <span className={styles.domainSubtitle}>{domain.subtitle}</span>
                  <p className={styles.domainDesc}>{domain.description}</p>
                </>
              ) : (
                <span className={styles.domainExploreTag}>Click to explore</span>
              )}
            </button>
          );
        })}

        {/* ── EMERGING ORBITING SKILL NODES (Active Category) ── */}
        {activeDomain && activeDomain.skills.map((skill, idx) => {
          const total = activeDomain.skills.length;
          const orbitRadius = screenType === 'mobile' ? 140 : screenType === 'tablet' ? 175 : 205;
          const baseAngle = (idx * 360) / total;
          const currentAngle = (baseAngle + orbitAngle) % 360;
          const rad = (currentAngle * Math.PI) / 180;
          
          const centerOffset = screenType === 'mobile' 
            ? { x: 0, y: 90 } 
            : screenType === 'tablet' 
              ? { x: 180, y: 0 } 
              : { x: 230, y: 0 };
          const x = centerOffset.x + Math.cos(rad) * orbitRadius;
          const y = centerOffset.y + Math.sin(rad) * orbitRadius;
          const isSkillHovered = hoveredSkill === skill;

          return (
            <div
              key={`${activeDomain.id}-${skill}`}
              className={styles.skillNode}
              style={{
                transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`
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
    </section>
  );
}

