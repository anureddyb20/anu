'use client';

import React, { useState, useEffect } from 'react';
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
  const [isHoveredOrTouched, setIsHoveredOrTouched] = useState(false);

  // When external pause (modal) is dismissed, ensure hover/touch is reset so scroll resumes immediately
  useEffect(() => {
    if (!isPausedExternal) {
      setIsHoveredOrTouched(false);
    }
  }, [isPausedExternal]);

  const isPaused = isHoveredOrTouched || isPausedExternal;

  // Duplicate data array twice to guarantee a seamless 50% infinite translation loop
  const duplicatedProjects = [...projectsData, ...projectsData];

  return (
    <div
      className={`${styles.carouselWrapper} ${isPaused ? styles.paused : ''}`}
      onMouseEnter={() => setIsHoveredOrTouched(true)}
      onMouseLeave={() => setIsHoveredOrTouched(false)}
      onTouchStart={() => setIsHoveredOrTouched(true)}
      onTouchEnd={() => setIsHoveredOrTouched(false)}
      aria-roledescription="carousel"
      aria-label="Continuous Projects Carousel"
    >
      <div className={styles.trackContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
              onSelect={(proj) => {
                setIsHoveredOrTouched(false);
                onSelectProject(proj);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
