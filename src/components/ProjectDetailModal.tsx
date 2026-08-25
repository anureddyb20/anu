'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Project } from '@/data/projectsData';
import TechBadge from './TechBadge';
import styles from './ProjectDetailModal.module.css';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock page background scroll (both body and html root)
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const primaryCategory = project.category.split('•')[0].trim();

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="compact-project-title"
    >
      {/* Compact Moderate-Sized Window */}
      <div className={styles.compactWindow} ref={windowRef}>
        {/* Subtle Minimal Window Header */}
        <div className={styles.windowHeader}>
          {/* Small Window Control Dots */}
          <div className={styles.controlDots}>
            <button
              type="button"
              className={`${styles.dot} ${styles.redDot}`}
              onClick={onClose}
              title="Close"
              aria-label="Close window"
            />
            <span className={`${styles.dot} ${styles.yellowDot}`} />
            <span className={`${styles.dot} ${styles.greenDot}`} />
          </div>

          {/* Minimal Header Title */}
          <div className={styles.headerTag}>
            <span>{project.name}</span>
            <span className={styles.headerDivider}>•</span>
            <span className={styles.headerCategory}>{primaryCategory}</span>
          </div>

          {/* Close Action Button */}
          <button
            type="button"
            className={styles.headerCloseBtn}
            onClick={onClose}
            aria-label="Close project view"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Window Body Container */}
        <div className={styles.windowBody}>
          {/* Project Screenshot Visual */}
          <div className={styles.imageStage}>
            <Image
              src={project.image}
              alt={`Visual dashboard preview of ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 760px"
              className={styles.projectImage}
              priority
            />
          </div>

          {/* Project Details Content */}
          <div className={styles.infoContent}>
            {/* Title & Category */}
            <div className={styles.titleGroup}>
              <span className={styles.typeBadge}>{project.category}</span>
              <h2 id="compact-project-title" className={styles.projectTitle}>
                {project.name}
              </h2>
            </div>

            {/* Overview */}
            <p className={styles.descriptionText}>{project.description}</p>

            {/* Key Features List */}
            {project.features && project.features.length > 0 && (
              <div className={styles.featuresSection}>
                <span className={styles.sectionHeading}>Key Features</span>
                <div className={styles.featureGrid}>
                  {project.features.map((feat, idx) => (
                    <div key={idx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div className={styles.techSection}>
              <span className={styles.sectionHeading}>Technologies Used</span>
              <div className={styles.techWrapper}>
                {project.techStack.map((tech, idx) => (
                  <TechBadge key={idx} name={tech} />
                ))}
              </div>
            </div>

            {/* Compact Close Button Bar (ZERO GitHub links) */}
            <div className={styles.buttonBar}>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
