'use client';

import React, { useState } from 'react';
import { resumeData } from '@/data/resumeData';
import styles from './ConnectSection.module.css';

interface ContactNode {
  id: string;
  label: string;
  type: string;
  tagline: string;
  actionText: string;
  url: string;
  icon: React.ReactNode;
  svgPath: string; // Path coordinates for connection line in 800x500 viewBox
}

export default function ConnectSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [clickedNode, setClickedNode] = useState<string | null>(null);

  // Define contact nodes matching exact data from resumeData
  const nodes: ContactNode[] = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      type: 'Professional Network',
      tagline: "Let's connect professionally.",
      actionText: 'OPEN PROFILE ↗',
      url: resumeData.linkedin,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      svgPath: 'M 400 65 L 400 135',
    },
    {
      id: 'email',
      label: 'Email',
      type: 'Direct Message',
      tagline: 'Have an idea or opportunity?',
      actionText: 'SEND EMAIL ↗',
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=${resumeData.email}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      svgPath: 'M 110 200 Q 240 210 280 235',
    },
    {
      id: 'github',
      label: 'GitHub',
      type: 'Code & Projects',
      tagline: 'Explore my open-source code.',
      actionText: 'VIEW GITHUB ↗',
      url: resumeData.github,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
      svgPath: 'M 690 200 Q 560 210 520 235',
    },
    {
      id: 'resume',
      label: 'Resume',
      type: 'PDF Document',
      tagline: 'View my professional profile.',
      actionText: 'VIEW RESUME ↗',
      url: resumeData.pdfUrl,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      svgPath: 'M 200 410 Q 300 370 325 330',
    },
    {
      id: 'phone',
      label: 'Direct Line',
      type: 'Phone Contact',
      tagline: 'Available for direct inquiries.',
      actionText: 'CALL NOW ↗',
      url: `tel:${resumeData.phone}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      svgPath: 'M 600 410 Q 500 370 475 330',
    },
  ];

  const handleNodeClick = (node: ContactNode, e: React.MouseEvent) => {
    e.preventDefault();
    setClickedNode(node.id);

    // Trigger signal pulse towards center before navigating
    setTimeout(() => {
      window.open(node.url, '_blank', 'noopener,noreferrer');
      setClickedNode(null);
    }, 250);
  };

  return (
    <section className={styles.connectSection} id="contact">
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} />

      {/* Header Container */}
      <div className={styles.headerContainer}>
        <div className={styles.sectionBadge}>
          <span className={styles.badgeDot} />
          Communication Network
        </div>

        <h2 className={styles.heading}>
          LET'S <span className={styles.highlight}>CONNECT</span>
        </h2>

        <p className={styles.subtitle}>
          Open to ideas, collaborations & opportunities. Let's build something meaningful together.
        </p>
      </div>

      {/* Interactive Communication Hub */}
      <div className={styles.hubStage}>
        {/* SVG Network Signal Lines & Animated Pulses (Desktop) */}
        <svg
          className={styles.networkSvg}
          viewBox="0 0 800 500"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
            </linearGradient>
            <filter id="pulseGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isClicked = clickedNode === node.id;

            return (
              <g key={node.id}>
                {/* Base Connection Path */}
                <path
                  d={node.svgPath}
                  className={`${styles.connectionPath} ${
                    isHovered ? styles.pathHovered : ''
                  }`}
                />

                {/* Signal Pulse Traveling Along Path */}
                <circle
                  r={isHovered ? '4.5' : '3'}
                  className={`${styles.signalPulse} ${
                    isHovered ? styles.signalFast : ''
                  } ${isClicked ? styles.signalClick : ''}`}
                  style={{
                    offsetPath: `path('${node.svgPath}')`,
                  }}
                  filter="url(#pulseGlow)"
                />
              </g>
            );
          })}
        </svg>

        {/* Central Hub Element */}
        <div className={styles.centralHub}>
          <div className={styles.centralPulseRing} />
          <div className={styles.centralCore}>
            <div className={styles.signalIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="2" />
                <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
              </svg>
            </div>
            <h3 className={styles.centralTitle}>LET'S CONNECT</h3>
            <p className={styles.centralText}>
              "Open to ideas, collaborations & opportunities."
            </p>
            <span className={styles.centralSubtext}>
              Let's build something meaningful together.
            </span>
          </div>
        </div>

        {/* Radial Contact Nodes */}
        <div className={styles.nodesGrid}>
          {nodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isClicked = clickedNode === node.id;

            return (
              <div
                key={node.id}
                className={`${styles.nodeWrapper} ${styles[`node_${node.id}`]}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Main Button */}
                <a
                  href={node.url}
                  onClick={(e) => handleNodeClick(node, e)}
                  className={`${styles.nodeBtn} ${isHovered ? styles.nodeHovered : ''} ${
                    isClicked ? styles.nodeClicked : ''
                  }`}
                  aria-label={`${node.label} - ${node.tagline}`}
                >
                  <div className={styles.nodeIconWrapper}>{node.icon}</div>
                  <span className={styles.nodeLabel}>{node.label}</span>
                  <span className={styles.nodeDot} />
                </a>

                {/* Compact Info Panel (Visible on Hover) */}
                <div
                  className={`${styles.infoCard} ${
                    isHovered ? styles.cardVisible : ''
                  }`}
                >
                  <span className={styles.cardType}>{node.type}</span>
                  <h4 className={styles.cardTitle}>{node.label}</h4>
                  <p className={styles.cardTagline}>"{node.tagline}"</p>
                  <div className={styles.cardAction}>
                    <span>{node.actionText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

