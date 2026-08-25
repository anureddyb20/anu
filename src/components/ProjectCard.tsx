import React from 'react';
import Image from 'next/image';
import { Project } from '@/data/projectsData';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  isActive?: boolean;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, isActive = false, onSelect }: ProjectCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  const primaryCategory = project.category.split('•')[0].trim();

  return (
    <div
      className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`View details for ${project.name}`}
    >
      {/* Project Visual Screenshot */}
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={`Screenshot and preview visual of ${project.name}`}
          fill
          sizes="(max-width: 768px) 300px, 380px"
          className={styles.image}
          priority={false}
        />
        <div className={styles.imageOverlay} />
        <span className={styles.categoryTag}>{primaryCategory}</span>
      </div>

      {/* Card Info */}
      <div className={styles.infoContainer}>
        <div className={styles.headerRow}>
          <h3 className={styles.title}>{project.name}</h3>
          <div className={styles.actionIcon} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>

        <p className={styles.subtitle}>{project.description}</p>

        <div className={styles.techPreview}>
          {project.techStack.slice(0, 3).map((tech, i) => (
            <span key={i} className={styles.techMiniPill}>
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className={styles.techMiniPill}>
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
