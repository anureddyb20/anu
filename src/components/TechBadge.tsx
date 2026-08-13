import React from 'react';
import styles from './TechBadge.module.css';

interface TechBadgeProps {
  name: string;
  showDot?: boolean;
}

export default function TechBadge({ name, showDot = false }: TechBadgeProps) {
  return (
    <span className={styles.badge}>
      {showDot && <span className={styles.dot} />}
      {name}
    </span>
  );
}
