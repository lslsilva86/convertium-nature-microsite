import React, { useEffect, useState } from 'react';
import ResponsiveBgImage from './ResponsiveBgImage';
import styles from '@/styles/SlideTwo.module.scss';
import Carousel from './Carousel';
import axios from 'axios';
import Loader from './Loader';
import AlertBox from './AlertBox';

interface ApiResponse {
  title: string;
  backgroundImages: {
    xl: string;
    md: string;
    sm: string;
  };
}

const SlideTwo: React.FC = () => {
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

  if (loading) {
    return <Loader elmClass="slideTwo" />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (data) {
    return (
      <div className={styles['slide-two']}>
        <ResponsiveBgImage backgroundImages={data.backgroundImages} />
        <div className={styles['slide-two__content']}>
          <h2>{data.title}</h2>
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
