import React from 'react';
import styles from './NavIndicators.module.scss';

interface Props {
  sections: number[];
  currentSectionIndex: number;
  onIndicatorClick: (index: number) => void;
}

const NavIndicators: React.FC<Props> = ({ sections, currentSectionIndex, onIndicatorClick }) => {
  return (
    <div className={styles['indicators']}>
      {sections.map((_, index) => (
        <div
          key={index}
          className={`${styles['indicators__item']} ${
            currentSectionIndex === index ? styles['indicators__item--active'] : ''
          }`}
          onClick={() => onIndicatorClick(index)}
        />
      ))}
    </div>
  );
};

export default NavIndicators;
