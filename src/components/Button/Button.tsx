import React from 'react';
import styles from './Button.module.css';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'danger'; 
}

export const Button = ({ children, variant = 'primary', ...props }: ButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};