import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import styles from '@/styles/Header.module.scss';
import LinkButton from './LinkButton';
import AlertBox from './AlertBox';
import Loader from './Loader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface HeaderProps {
  isVisible: boolean;
}

interface ApiResponse {
  logoUrl: string;
  linkText: string;
  linkAddress: string;
}

const Header: React.FC<HeaderProps> = ({ isVisible }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL as string}/header`);
        setApiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching header data:', error);
        setError('Error fetching header data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader elmClass="header" />;
  }

  if (apiData) {
    return (
      <header className={`${styles.header} ${poppins.className}`}>
        <div className={styles['header__inner']}>
          <div>
            {apiData.logoUrl && (
              <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_URL as string}${apiData.logoUrl}`}
                alt="Logo"
                width={isMobile ? 100 : 150}
                height={isMobile ? 59 : 100}
              />
            )}
          </div>
          {isVisible && (
            <LinkButton
              text={apiData.linkText}
              link={apiData.linkAddress}
            />
          )}
        </div>
      </header>
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

export default Header;
