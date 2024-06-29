import React, { useEffect, useState } from 'react';
import ResponsiveBgImage from './ResponsiveBgImage';
import styles from '@/styles/SlideTwo.module.scss';
import Carousel from './Carousel';
import axios from 'axios';
import Loader from './Loader';
import AlertBox from './AlertBox';
import { motion, AnimationControls } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

interface ApiResponse {
  title: string;
  backgroundImages: {
    xl: string;
    md: string;
    sm: string;
  };
}

interface SlideTwoProps {
  controls: AnimationControls;
}

const SlideTwo: React.FC<SlideTwoProps> = ({ controls }) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL as string}/slideTwo`);
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  if (loading) {
    return <Loader elmClass="slideTwo" />;
  }

  if (data) {
    return (
      <div
        className={styles['slide-two']}
        role="region"
      >
        <AnimatedBackground />
        <ResponsiveBgImage backgroundImages={data.backgroundImages} />
        <div className={styles['slide-two__content']}>
          <motion.h2
            initial="hidden"
            animate={controls}
            variants={textVariants}
          >
            {data.title}
          </motion.h2>
          <Carousel />
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

export default SlideTwo;
