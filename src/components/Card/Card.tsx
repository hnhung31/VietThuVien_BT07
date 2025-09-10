
import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties; 
}

export const Card = ({ children, className = '', style }: CardProps) => {
  const cardClasses = `${styles.card} ${className}`;
  return (
    <div className={cardClasses} style={style}>
      {children}
    </div>
  );
};