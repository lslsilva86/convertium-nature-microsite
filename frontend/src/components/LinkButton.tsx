import React from 'react';
import styles from '@/styles/LinkButton.module.scss';

interface LindButtonProps {
  text: string;
  link: string;
}

const LindButton: React.FC<LindButtonProps> = ({ text, link }) => {
  return (
    <a
      className={styles['link']}
      href={link}
      target="_blank"
    >
      <span className={`${styles['link__arrow']} ${styles['link__arrow--left']}`}>
        <span className={styles['link__arrow-shaft']}></span>
      </span>
      <span className={styles['link__main']}>
        <span className={styles['link__text']}>{text}</span>
        <span className={`${styles['link__arrow']} ${styles['link__arrow--right']}`}>
          <span className={styles['link__arrow-shaft']}></span>
        </span>
      </span>
    </a>
  );
};

export default LindButton;
