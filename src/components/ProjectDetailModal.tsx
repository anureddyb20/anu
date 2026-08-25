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
      aria-labelledby="browser-project-title"
    >
      {/* Expandable Browser Window Container */}
      <div className={styles.browserWindow} ref={windowRef}>
        {/* Browser Top Navigation Bar */}
        <div className={styles.browserHeader}>
          {/* Traffic Light Control Dots */}
          <div className={styles.trafficLights}>
            <button
              type="button"
              className={`${styles.dot} ${styles.redDot}`}
              onClick={onClose}
              title="Close window"
              aria-label="Close project window"
            />
            <span className={`${styles.dot} ${styles.yellowDot}`} />
            <span className={`${styles.dot} ${styles.greenDot}`} />
          </div>

          {/* Browser Address Bar */}
          <div className={styles.addressBar}>
            <svg
              className={styles.lockIcon}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className={styles.urlText}>
              https://anureddy.dev/projects/{project.id}
            </span>
          </div>

          {/* Window Close Action Button */}
          <button
            type="button"
            className={styles.headerCloseBtn}
            onClick={onClose}
            aria-label="Close project detail view"
          >
            <svg
              width="16"
              height="16"
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

        {/* Browser Content Body */}
        <div className={styles.browserBody}>
          {/* Project Screenshot Visual Stage */}
          <div className={styles.screenshotFrame}>
            <Image
              src={project.image}
              alt={`High quality project preview of ${project.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 840px"
              className={styles.screenshotImage}
              priority
            />
            <div className={styles.categoryPillOverlay}>{project.category}</div>
          </div>

          {/* Project Details Section */}
          <div className={styles.detailsContent}>
            <div className={styles.mainTitleRow}>
              <div>
                <span className={styles.categorySubhead}>{primaryCategory}</span>
                <h2 id="browser-project-title" className={styles.projectTitle}>
                  {project.name}
                </h2>
              </div>
            </div>

            {/* Short Description (2-3 lines) */}
            <div className={styles.sectionBlock}>
              <span className={styles.sectionHeading}>Overview</span>
              <p className={styles.descriptionText}>{project.description}</p>
            </div>

            {/* Key Features (if present) */}
            {project.features && project.features.length > 0 && (
              <div className={styles.sectionBlock}>
                <span className={styles.sectionHeading}>Key Features</span>
                <ul className={styles.featureGrid}>
                  {project.features.map((feat, idx) => (
                    <li key={idx} className={styles.featureBullet}>
                      <svg
                        className={styles.bulletCheck}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div className={styles.sectionBlock}>
              <span className={styles.sectionHeading}>Technologies Used</span>
              <div className={styles.techWrapper}>
                {project.techStack.map((tech, idx) => (
                  <TechBadge key={idx} name={tech} />
                ))}
              </div>
            </div>

            {/* Bottom Footer Actions Bar (Close button only, ZERO GitHub links) */}
            <div className={styles.footerRow}>
              <button
                type="button"
                className={styles.closeWindowBtn}
                onClick={onClose}
              >
                <span>Close Project Window</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
