'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Project, projectsData } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectCarousel.module.css';

interface ProjectCarouselProps {
  onSelectProject: (project: Project) => void;
  isPausedExternal?: boolean;
}

export default function ProjectCarousel({ onSelectProject }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const railRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const totalCount = projectsData.length;

  // Calculate active index based on scroll position relative to container center
  const updateActiveIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = rail.querySelectorAll<HTMLDivElement>(`.${styles.cardWrapper}`);
    if (!cards || cards.length === 0) return;

    const railRect = rail.getBoundingClientRect();
    const railCenter = railRect.left + railRect.width / 2;

    let minDistance = Infinity;
    let closestIndex = 0;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(cardCenter - railCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Initial calculation
    updateActiveIndex();

    // Scroll listener to update active card indicator on manual scroll
    const handleScroll = () => {
      updateActiveIndex();
    };

    rail.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveIndex);

    return () => {
      rail.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveIndex);
    };
  }, [updateActiveIndex]);

  // Scroll to specific index smoothly
  const scrollToIndex = useCallback((index: number) => {
    const rail = railRef.current;
    if (!rail) return;

    const cards = rail.querySelectorAll<HTMLDivElement>(`.${styles.cardWrapper}`);
    if (cards[index]) {
      const targetCard = cards[index];
      const railWidth = rail.offsetWidth;
      const cardWidth = targetCard.offsetWidth;
      const targetScroll = targetCard.offsetLeft - (railWidth - cardWidth) / 2;

      rail.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    const nextIdx = Math.min(totalCount - 1, activeIndex + 1);
    scrollToIndex(nextIdx);
  }, [activeIndex, scrollToIndex, totalCount]);

  const handlePrev = useCallback(() => {
    const prevIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(prevIdx);
  }, [activeIndex, scrollToIndex]);

  // Keyboard navigation when focused on rail
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if focus is within projects section or no modal is active
      const activeEl = document.activeElement;
      if (activeEl && railRef.current?.contains(activeEl)) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          handleNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Wheel Handler: translate vertical scroll into smooth horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    const rail = railRef.current;
    if (!rail) return;

    // If wheel event has vertical delta, convert to horizontal scroll
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      rail.scrollLeft += e.deltaY;
    }
  };

  // Mouse Drag Handlers for Desktop Click-and-Drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only primary left click
    const rail = railRef.current;
    if (!rail) return;

    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.pageX - rail.offsetLeft;
    scrollLeftRef.current = rail.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const rail = railRef.current;
    if (!rail) return;

    const x = e.pageX - rail.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag sensitivity factor

    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
    }

    rail.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDragging(false);

    // Reset drag flag after short delay to allow click handler check
    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 50);
  };

  const handleMouseLeave = () => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsDragging(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }
  };

  // Intercept card click: prevent detail modal opening if user was dragging
  const handleCardSelect = (project: Project) => {
    if (hasDraggedRef.current) return;
    onSelectProject(project);
  };

  return (
    <div className={styles.railContainer}>
      {/* Horizontal Scrollable Rail */}
      <div
        ref={railRef}
        className={`${styles.projectRail} ${isDragging ? styles.isDragging : ''}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.railTrack}>
          {projectsData.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <div key={project.id} className={styles.cardWrapper}>
                <ProjectCard
                  project={project}
                  isActive={isActive}
                  onSelect={() => handleCardSelect(project)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Manual Navigation Controls Row */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={handlePrev}
          disabled={activeIndex === 0}
          aria-label="Previous project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className={styles.dotsRow} role="tablist" aria-label="Project Selection">
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ''}`}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to project ${idx + 1}: ${project.name}`}
              role="tab"
              aria-selected={idx === activeIndex}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={handleNext}
          disabled={activeIndex === totalCount - 1}
          aria-label="Next project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
