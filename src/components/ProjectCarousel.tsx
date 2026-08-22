'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Project, projectsData } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectCarousel.module.css';

interface ProjectCarouselProps {
  onSelectProject: (project: Project) => void;
  isPausedExternal?: boolean;
}

export default function ProjectCarousel({
  onSelectProject,
  isPausedExternal = false,
}: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftStartRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Tripled dataset guarantees infinite seamless manual and auto scroll loops
  const tripleProjects = [...projectsData, ...projectsData, ...projectsData];

  // Pause interaction momentarily on manual interaction and resume after inactivity
  const pauseAutoScroll = useCallback(() => {
    setIsInteracting(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2500);
  }, []);

  // Continuous JS Auto-Scroll Animation Loop with seamless loop reset
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animId: number;
    let lastTime = performance.now();

    const scrollLoop = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isInteracting && !isPausedExternal && !isDragging) {
        // Smooth 0.8px per frame auto-scroll speed
        const speed = 0.05 * Math.min(delta, 32);
        el.scrollLeft += speed;

        // Wrap around seamlessly at 1/3 or 2/3 of total scroll width
        const maxScroll = el.scrollWidth / 3;
        if (el.scrollLeft >= maxScroll * 2) {
          el.scrollLeft -= maxScroll;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += maxScroll;
        }
      }

      animId = requestAnimationFrame(scrollLoop);
    };

    animId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animId);
  }, [isInteracting, isPausedExternal, isDragging]);

  // Click & Drag Manual Panning Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    setIsDragging(true);
    pauseAutoScroll();
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftStartRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftStartRef.current - walk;
    pauseAutoScroll();
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      pauseAutoScroll();
    }
  };

  // Manual Arrow Navigation Controls
  const scrollManual = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    pauseAutoScroll();
    const scrollAmount = 380;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Manual Left Arrow Button */}
      <button
        className={`${styles.navButton} ${styles.navLeft}`}
        onClick={() => scrollManual('left')}
        aria-label="Scroll projects left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Interactive Auto + Manual Scroll Container */}
      <div
        ref={containerRef}
        className={`${styles.carouselWrapper} ${isDragging ? styles.dragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onScroll={pauseAutoScroll}
        onTouchStart={pauseAutoScroll}
        aria-roledescription="carousel"
        aria-label="Interactive Auto and Manual Projects Carousel"
      >
        <div className={styles.marqueeTrack}>
          {tripleProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>

      {/* Manual Right Arrow Button */}
      <button
        className={`${styles.navButton} ${styles.navRight}`}
        onClick={() => scrollManual('right')}
        aria-label="Scroll projects right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
}

