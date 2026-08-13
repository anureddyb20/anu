'use client';

import React, { useState } from 'react';
import { Project } from '@/data/projectsData';
import ProjectCarousel from './ProjectCarousel';
import ProjectDetailModal from './ProjectDetailModal';
import styles from './ProjectsSection.module.css';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className={styles.projects} id="projects">
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} />

      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot} />
          Portfolio Showcase
        </div>

        <h2 className={styles.heading}>
          Selected <span className={styles.highlight}>Projects</span>
        </h2>

        <p className={styles.subtitle}>
          Projects built through experimentation, problem-solving and technology.
        </p>
      </div>

      {/* Cinematic Right-to-Left Infinite Carousel */}
      <ProjectCarousel onSelectProject={(project) => setSelectedProject(project)} />

      {/* Interactive Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
