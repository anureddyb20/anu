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

// Anti-gravity zero-G cosmic dust particle coordinates
const ANTIGRAVITY_PARTICLES = Array.from({ length: 14 }).map((_, i) => ({
  id: i,
  x: (i * 73 + 19) % 90 - 45, // -45% to +45%
  y: (i * 47 + 31) % 90 - 45,
  size: (i % 3) + 2,
  duration: 4 + (i % 5) * 1.2,
  delay: (i % 4) * 0.7
}));

export default function SkillsSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [orbitAngle, setOrbitAngle] = useState<number>(0);
  const [floatTime, setFloatTime] = useState<number>(0);
  const [screenType, setScreenType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  // Continuous Anti-Gravity Orbit & Weightless Levitation Physics Loop
  const lastTimeRef = useRef<number>(0);
  useEffect(() => {
    let animId: number;
    const animate = (time: number) => {
      if (lastTimeRef.current !== 0) {
        const delta = time - lastTimeRef.current;
        const speed = isHovered ? 0.003 : 0.012;
        setOrbitAngle((prev) => (prev + delta * speed) % 360);
        setFloatTime((prev) => prev + delta * 0.0015);
      }
      lastTimeRef.current = time;
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  // Anti-gravity cursor reaction field
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const nx = (e.clientX - centerX) / (rect.width / 2);
    const ny = (e.clientY - centerY) / (rect.height / 2);
    setMouseOffset({ x: nx * 14, y: ny * 14 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredSkill(null);
    setHoveredDomainId(null);
    setMouseOffset({ x: 0, y: 0 });
  };

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
    if (domainId === selectedId) {
      if (screenType === 'mobile') return { x: 0, y: 90 };
      if (screenType === 'tablet') return { x: 180, y: 0 };
      return { x: 230, y: 0 };
    }

    const inactiveDomainIds = DOMAINS.filter((d) => d.id !== selectedId).map((d) => d.id);
    const indexInInactive = inactiveDomainIds.indexOf(domainId);

    if (screenType === 'mobile') {
      const xPos = (indexInInactive - 1) * 90;
      return { x: xPos, y: -150 };
    }

    if (screenType === 'tablet') {
      const yPos = (indexInInactive - 1) * 120;
      return { x: -200, y: yPos };
    }

    const yPos = (indexInInactive - 1) * 140;
    return { x: -240, y: yPos };
  };

  return (
    <section className={styles.skills} id="skills">
      {/* ── Section Header ── */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot}></span>
          ANTIGRAVITY ECOSYSTEM EXPLORER
        </div>
        <h2 className={styles.heading}>
          TECHNICAL <span className={styles.highlight}>ECOSYSTEM EXPLORER</span>
        </h2>
        <p className={styles.subtitle}>
          {selectedId === null 
            ? 'Select a floating domain circle to expand its interactive zero-G technology orbit.'
            : 'Exploring selected domain. Click any circular node on the left to switch or reset below.'}
        </p>
      </div>

      {/* ── Reset Ecosystem Control ── */}
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

      {/* ── ANTIGRAVITY CIRCULAR STAGE CONTAINER ── */}
      <div 
        className={styles.ecosystemStage}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${-mouseOffset.y * 0.15}deg) rotateY(${mouseOffset.x * 0.15}deg)`
        }}
      >
        {/* Zero-G Floating Cosmic Particles Background */}
        <div className={styles.antigravityParticlesField}>
          {ANTIGRAVITY_PARTICLES.map((p) => {
            const floatY = Math.sin(floatTime * 2 + p.id) * 12;
            const floatX = Math.cos(floatTime * 1.5 + p.id) * 8;
            return (
              <span
                key={p.id}
                className={styles.antigravityParticle}
                style={{
                  left: `calc(50% + ${p.x}% + ${floatX}px)`,
                  top: `calc(50% + ${p.y}% + ${floatY}px)`,
                  width: `${p.size}px`,
                  height: `${p.size}px`
                }}
              />
            );
          })}
        </div>

        {/* Central Prompt Core Node (State 1 Initial Ecosystem) */}
        <div 
          className={styles.centerPromptNode}
          style={{
            opacity: selectedId === null ? 1 : 0,
            pointerEvents: selectedId === null ? 'auto' : 'none',
            transform: selectedId === null 
              ? `translate(-50%, -50%) translate3d(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px, 0) scale(1)` 
              : 'translate(-50%, -50%) scale(0.4)'
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

        {/* ── 100% PURE CIRCULAR DOMAIN NODES WITH ANTIGRAVITY LEVITATION ── */}
        {DOMAINS.map((domain, idx) => {
          const isSelected = domain.id === selectedId;
          const isHoveredDomain = hoveredDomainId === domain.id && !isSelected;
          const pos = getCirclePosition(domain.id);
          
          // Anti-gravity float oscillation physics
          const floatY = Math.sin(floatTime * 2.5 + idx * 1.5) * 5;
          const floatX = Math.cos(floatTime * 2.0 + idx * 1.2) * 4;
          
          // Cursor anti-gravity displacement
          const cursorX = mouseOffset.x * (isSelected ? 0.2 : 0.8);
          const cursorY = mouseOffset.y * (isSelected ? 0.2 : 0.8);
          
          const scale = isHoveredDomain ? 1.08 : 1;

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
                transform: `translate3d(${pos.x + floatX + cursorX}px, ${pos.y + floatY + cursorY}px, 0) scale(${scale})`
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
          
          // Anti-gravity micro bobbing
          const skillFloat = Math.sin(floatTime * 3 + idx) * 3;

          const centerOffset = screenType === 'mobile' 
            ? { x: 0, y: 90 } 
            : screenType === 'tablet' 
              ? { x: 180, y: 0 } 
              : { x: 230, y: 0 };
          const x = centerOffset.x + Math.cos(rad) * orbitRadius + mouseOffset.x * 0.3;
          const y = centerOffset.y + Math.sin(rad) * orbitRadius + skillFloat + mouseOffset.y * 0.3;
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


