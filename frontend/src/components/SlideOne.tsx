import React from 'react';
import FullScreenVideo from './FullScreenVideo';

import styles from '@/styles/SlideOne.module.scss';

interface Props {}

const SlideOne: React.FC<Props> = (props) => {
  return (
    <div className={styles['slide-one']}>
      <FullScreenVideo />
      <div className={styles['slide-one__content']}>
        <h1>LOREM IPSUM DOLOR</h1>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.</p>
      </div>
    </div>
  );
};

export default SlideOne;
