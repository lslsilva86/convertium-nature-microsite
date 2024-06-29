import React, { useEffect, useState } from 'react';
import FullScreenVideo from './FullScreenVideo';
import styles from '@/styles/SlideOne.module.scss';
import axios from 'axios';
import AlertBox from './AlertBox';
import Loader from './Loader';

interface ApiResponse {
  videoUrl: string;
  content: {
    title: string;
    description: string;
  };
}

const SlideOne: React.FC = () => {
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

  if (loading) {
    return <Loader elmClass="slideOne" />;
  }

  if (data) {
    return (
      <div className={styles['slide-one']}>
        <FullScreenVideo videoUrl={data.videoUrl} />
        <div className={styles['slide-one__content']}>
          <h1>{data.content.title}</h1>
          <p>{data.content.description}</p>
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
