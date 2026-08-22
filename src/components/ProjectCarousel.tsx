'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Project, projectsData } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectCarousel.module.css';

interface ProjectCarouselProps {
  onSelectProject: (project: Project) => void;
  isPausedExternal?: boolean;
}

export default function ProjectCarousel({
  onSelectProject,
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dragDelta, setDragDelta] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [stepWidth, setStepWidth] = useState<number>(412);
  const [centerPadding, setCenterPadding] = useState<number>(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef<number>(0);
  const hasDraggedRef = useRef<boolean>(false);
  const totalCount = projectsData.length;

  // Measure card sizes and calculate center alignment
  const measureLayout = useCallback(() => {
    if (!wrapperRef.current || !trackRef.current) return;
    const stageWidth = wrapperRef.current.offsetWidth;
    const firstCard = trackRef.current.children[0] as HTMLElement;

    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;
      const computedTrack = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(computedTrack.gap || '32');
      const calculatedStep = cardWidth + gap;
      setStepWidth(calculatedStep);

      // Center the active card horizontally within the stage container
      const padding = Math.max(0, (stageWidth - cardWidth) / 2);
      setCenterPadding(padding);
    }
  }, []);

  useEffect(() => {
    measureLayout();
    window.addEventListener('resize', measureLayout);
    return () => window.removeEventListener('resize', measureLayout);
  }, [measureLayout]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(totalCount - 1, prev + 1));
  }, [totalCount]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Pointer & Touch Handlers
  const handlePointerDown = (clientX: number) => {
    startXRef.current = clientX;
    hasDraggedRef.current = false;
    setIsMouseDown(true);
    setDragDelta(0);
  };

  const handlePointerMove = (clientX: number) => {
    if (!isMouseDown) return;
    const diff = clientX - startXRef.current;
    
    // Distinguish click vs drag (6px threshold)
    if (Math.abs(diff) > 6) {
      hasDraggedRef.current = true;
      setIsDragging(true);
    }
    setDragDelta(diff);
  };

  const handlePointerUp = () => {
    if (!isMouseDown) return;
    setIsMouseDown(false);
    setIsDragging(false);

    if (hasDraggedRef.current) {
      // Calculate snap based on drag direction and magnitude
      if (dragDelta < -40) {
        handleNext();
      } else if (dragDelta > 40) {
        handlePrev();
      }
      // Reset drag flag after short delay to suppress onClick event
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 50);
    }

    setDragDelta(0);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handlePointerDown(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handlePointerMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handlePointerUp();
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only respond to primary left click
    if (e.button !== 0) return;
    handlePointerDown(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handlePointerMove(e.clientX);
  };

  const handleMouseUp = () => {
    handlePointerUp();
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      handlePointerUp();
    }
  };

  // Intercept Card Click: prevent modal opening if user was dragging
  const handleSelectCard = (project: Project) => {
    if (hasDraggedRef.current) return;
    onSelectProject(project);
  };

  // Calculate current translation offset
  const baseTranslate = centerPadding - currentIndex * stepWidth;
  const currentTranslate = baseTranslate + dragDelta;

  return (
    <div
      ref={wrapperRef}
      className={styles.carouselWrapper}
      aria-roledescription="carousel"
      aria-label="Featured Projects Showcase"
    >
      <div
        className={`${styles.trackStage} ${isDragging ? styles.isDragging : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className={`${styles.carouselTrack} ${isMouseDown ? styles.isDraggingTrack : ''}`}
          style={{
            transform: `translate3d(${currentTranslate}px, 0, 0)`,
          }}
        >
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={() => handleSelectCard(project)}
            />
          ))}
        </div>
      </div>

      {/* Manual Navigation Row (Arrows + Dots) */}
      <div className={styles.controlsRow}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous Project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className={styles.dotsRow} role="tablist" aria-label="Project Navigation">
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to project ${idx + 1}: ${project.name}`}
              role="tab"
              aria-selected={idx === currentIndex}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={handleNext}
          disabled={currentIndex === totalCount - 1}
          aria-label="Next Project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
