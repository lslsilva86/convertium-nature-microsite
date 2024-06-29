import React, { useEffect, useState } from 'react';
import FullScreenVideo from './FullScreenVideo';
import styles from '@/styles/SlideOne.module.scss';
import axios from 'axios';
import AlertBox from './AlertBox';
import Loader from './Loader';
import { motion, useAnimation, AnimationControls } from 'framer-motion';

interface ApiResponse {
  videoUrl: string;
  content: {
    title: string;
    description: string;
  };
}

interface SlideOneProps {
  controls: AnimationControls;
}

const SlideOne: React.FC<SlideOneProps> = ({ controls }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL as string}/slideOne`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch slide data:', error);
        setError('Failed to fetch slide data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      controls.start('visible');
    }
  }, [data, controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  if (loading) {
    return <Loader elmClass="slideOne" />;
  }

  if (data) {
    return (
      <div
        className={styles['slide-one']}
        role="region"
      >
        <FullScreenVideo videoUrl={data.videoUrl} />
        <div className={styles['slide-one__content']}>
          <motion.h1
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            {data.content.title}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            {data.content.description}
          </motion.p>
        </div>
      </div>
    );
  } else {
    return (
      <AlertBox
        message={error || ''}
        type="error"
      />
    );
  }
};

export default SlideOne;
