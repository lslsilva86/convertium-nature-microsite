import React from 'react';
import ResponsiveBgImage from './ResponsiveBgImage';
import styles from '@/styles/SlideTwo.module.scss';
import Carousel from './Carousel';

interface Props {}

const SlideTwo: React.FC<Props> = (props) => {
  return (
    <div className={styles['slide-two']}>
      <ResponsiveBgImage />
      <div className={styles['slide-two__content']}>
        <h2>DONEC NEC JUSTO</h2>
        <Carousel />
      </div>
    </div>
  );
};

export default SlideTwo;
