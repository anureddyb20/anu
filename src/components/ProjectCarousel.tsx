'use client';

import React from 'react';
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
  // Duplicate data array twice to guarantee a seamless 50% infinite translation loop
  const duplicatedProjects = [...projectsData, ...projectsData];

  return (
    <div
      className={`${styles.carouselWrapper} ${isPausedExternal ? styles.paused : ''}`}
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
