'use client';

import React from 'react';
import Image from 'next/image';
import { resumeData } from '@/data/resumeData';
import styles from './ResumeSection.module.css';

export default function ResumeSection() {
  const handleOpenPdf = () => {
    window.open(resumeData.pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.resumeSection} id="resume">
      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot} />
          CURRICULUM VITAE
        </div>

        <h2 className={styles.heading}>
          RESUME & <span className={styles.highlight}>EXPERIENCE</span>
        </h2>

        <p className={styles.subtitle}>
          Official resume of {resumeData.name}. View or download the verified PDF document.
        </p>
      </div>

      {/* Main 2-Column Grid */}
      <div className={styles.gridContainer}>
        {/* Left Column: Actual Resume PDF Preview */}
        <div className={styles.previewCard}>
          <div className={styles.imageWrapper} onClick={handleOpenPdf} style={{ cursor: 'pointer' }}>
            <Image
              src={resumeData.previewUrl}
              alt={`Resume Preview of ${resumeData.name}`}
              fill
              sizes="(max-width: 900px) 100vw, 500px"
              style={{ objectFit: 'contain', padding: '8px' }}
              priority
              unoptimized
            />
          </div>

          <div className={styles.actionRow}>
            <button
              type="button"
              className={styles.viewBtn}
              onClick={handleOpenPdf}
              aria-label="View full resume PDF"
            >
              <span>VIEW RESUME</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>

            <a
              href={resumeData.pdfUrl}
              download="Anu-Reddy-Resume.pdf"
              className={styles.downloadBtn}
              aria-label="Download resume PDF"
            >
              <span>DOWNLOAD PDF</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Structured Overview extracted from PDF */}
        <div className={styles.overviewCol}>
          {/* Education Block */}
          <div className={styles.infoBlock}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Education
              </h3>
              <span className={styles.cgpaBadge}>{resumeData.education.cgpa}</span>
            </div>
            <div className={styles.eduDegree}>{resumeData.education.degree}</div>
            <div className={styles.eduInst}>
              {resumeData.education.institution} • {resumeData.education.years}
            </div>
          </div>

          {/* Key Skills Block */}
          <div className={styles.infoBlock}>
            <h3 className={styles.blockTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Core Competencies
            </h3>

            <div className={styles.skillsGroup}>
              <span className={styles.groupLabel}>Programming & Frontend</span>
              <div className={styles.pillsRow}>
                {[...resumeData.skills.programming, ...resumeData.skills.frontend].map((s) => (
                  <span key={s} className={styles.skillPill}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.skillsGroup}>
              <span className={styles.groupLabel}>Tools & Technologies</span>
              <div className={styles.pillsRow}>
                {resumeData.skills.tools.map((t) => (
                  <span key={t} className={styles.skillPill}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Workshops & Competitions Block */}
          <div className={styles.infoBlock}>
            <h3 className={styles.blockTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15l-2 5l9-9l-4 0l2-5l-9 9l4 0z" />
              </svg>
              Workshops & Competitions
            </h3>

            <div className={styles.listRow}>
              {[...resumeData.workshops, ...resumeData.competitions].map((item, idx) => (
                <div key={idx} className={styles.listItem}>
                  <span className={styles.dotIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
