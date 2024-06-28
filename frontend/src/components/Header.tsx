import React, { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import styles from '@/styles/Header.module.scss';
import LindButton from './LinkButton';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});
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
    <header className={`${styles.header} ${poppins.className}`}>
      <div className={styles['header__inner']}>
        <div>
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={isMobile ? 100 : 150}
            height={isMobile ? 59 : 100}
          />
        </div>
        {isVisible && (
          <LindButton
            text="Discover More"
            link="https://google.com"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
