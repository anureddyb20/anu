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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const activeDomain = DOMAINS.find((d) => d.id === selectedId) || null;

  // Responsive screen size listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
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

  // Fixed 2D Coordinates mapping per domain to ensure 100% glitch-free transitions
  const getCirclePosition = (domainId: string) => {
    // ── STATE 1: Initial Balanced Ecosystem (selectedId === null) ──
    if (selectedId === null) {
      if (isMobile) {
        const initialMobileMap: Record<string, { x: number; y: number }> = {
          frontend: { x: 0, y: -140 },
          hardware: { x: 130, y: 30 },
          tools: { x: 0, y: 140 },
          backend: { x: -130, y: 30 }
        };
        return initialMobileMap[domainId] || { x: 0, y: 0 };
      }
      const initialDesktopMap: Record<string, { x: number; y: number }> = {
        frontend: { x: 0, y: -190 },
        hardware: { x: 210, y: 30 },
        tools: { x: 0, y: 190 },
        backend: { x: -210, y: 30 }
      };
      return initialDesktopMap[domainId] || { x: 0, y: 0 };
    }

    // ── STATE 2: Category Selected ──
    // Active Selected Domain -> Travels to RIGHT side
    if (domainId === selectedId) {
      return isMobile ? { x: 0, y: 100 } : { x: 250, y: 0 };
    }

    // Inactive Domains -> Sit at DETERMINISTIC FIXED LEFT SLOTS (never swap or jump)
    if (isMobile) {
      const fixedMobileLeftMap: Record<string, { x: number; y: number }> = {
        frontend: { x: -120, y: -175 },
        hardware: { x: -40, y: -175 },
        tools: { x: 40, y: -175 },
        backend: { x: 120, y: -175 }
      };
      return fixedMobileLeftMap[domainId] || { x: 0, y: 0 };
    }

    const fixedDesktopLeftMap: Record<string, { x: number; y: number }> = {
      frontend: { x: -280, y: -150 },
      hardware: { x: -330, y: -50 },
      tools: { x: -330, y: 50 },
      backend: { x: -280, y: 150 }
    };
    return fixedDesktopLeftMap[domainId] || { x: 0, y: 0 };
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
        {/* Central Prompt Node (State 1 Initial Ecosystem) */}
        <div 
          className={styles.centerPromptNode}
          style={{
            opacity: selectedId === null ? 1 : 0,
            pointerEvents: selectedId === null ? 'auto' : 'none',
            transform: selectedId === null ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)'
          }}
        >
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

        {/* Orbit Path Ring for Expanded Right System (State 2) */}
        {selectedId !== null && (
          <div 
            className={styles.orbitRingPath}
            style={{
              transform: isMobile 
                ? 'translate(-50%, calc(-50% + 100px))' 
                : 'translate(calc(-50% + 250px), -50%)'
            }}
          ></div>
        )}

        {/* ── 100% PURE CIRCULAR DOMAIN NODES ── */}
        {DOMAINS.map((domain) => {
          const isSelected = domain.id === selectedId;
          const isHoveredDomain = hoveredDomainId === domain.id && !isSelected;
          const pos = getCirclePosition(domain.id);
          const scale = isHoveredDomain ? 1.08 : 1;

          return (
            <button
              key={domain.id}
              className={`${styles.domainCircle} ${isSelected ? styles.domainCircleActive : styles.domainCircleInactive}`}
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
          const orbitRadius = isMobile ? 145 : 215;
          const baseAngle = (idx * 360) / total;
          const currentAngle = (baseAngle + orbitAngle) % 360;
          const rad = (currentAngle * Math.PI) / 180;
          
          // Right side orbit center offset
          const centerOffset = isMobile ? { x: 0, y: 100 } : { x: 250, y: 0 };
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
