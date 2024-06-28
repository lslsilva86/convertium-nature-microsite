import React, { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import styles from '@/styles/Header.module.scss';
import LindButton from './LinkButton';

const inter = Inter({ subsets: ['latin'] });

interface Props {
  isVisible: boolean;
}

const Header: React.FC<Props> = ({ isVisible }) => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <header className={`${styles.header} ${inter.className}`}>
      <div>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={isMobile ? 75 : 100}
          height={isMobile ? 50 : 67}
        />
      </div>
      {isVisible && (
        <LindButton
          text="Discover More"
          link="https://google.com"
        />
      )}
    </header>
  );
};

export default Header;
