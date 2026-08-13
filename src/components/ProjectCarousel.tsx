'use client';

import React, { useState } from 'react';
import { Project, projectsData } from '@/data/projectsData';
import ProjectCard from './ProjectCard';
import styles from './ProjectCarousel.module.css';

interface ProjectCarouselProps {
  onSelectProject: (project: Project) => void;
}

export default function ProjectCarousel({ onSelectProject }: ProjectCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate data array twice to guarantee a seamless 50% infinite translation loop
  const duplicatedProjects = [...projectsData, ...projectsData];

  return (
    <div
      className={`${styles.carouselWrapper} ${isPaused ? styles.paused : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Continuous Projects Carousel"
    >
      <div className={styles.trackContainer}>
        <div className={styles.marqueeTrack}>
          {duplicatedProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
