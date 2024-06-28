import React from 'react';
import styles from '@/styles/FullScreenVideo.module.scss';

const FullScreenVideo: React.FC = () => {
  return (
    <div className={styles['video-container']}>
      <video
        autoPlay
        muted
        loop
        className={styles['video']}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FullScreenVideo;
