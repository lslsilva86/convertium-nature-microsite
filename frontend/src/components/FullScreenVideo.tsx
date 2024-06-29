import React from 'react';
import styles from '@/styles/FullScreenVideo.module.scss';

interface FullScreenVideoProps {
  videoUrl: string;
}

const FullScreenVideo: React.FC<FullScreenVideoProps> = ({ videoUrl }) => {
  return (
    <div className={styles['video-container']}>
      <video
        autoPlay
        muted
        loop
        className={styles['video']}
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default FullScreenVideo;
