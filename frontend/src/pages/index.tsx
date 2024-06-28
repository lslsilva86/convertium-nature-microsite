import { useEffect, useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Head from 'next/head';
import Section from '@/components/Section';
import NavIndicators from '@/components/NavIndicators';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const direction = event.deltaY > 0 ? 'down' : 'up';
      navigateToSection(direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSectionIndex]);

  const navigateToSection = (direction: 'up' | 'down') => {
    let nextSectionIndex = currentSectionIndex;
    if (direction === 'down') {
      nextSectionIndex = Math.min(currentSectionIndex + 1, sectionsRef.current.length - 1);
    } else if (direction === 'up') {
      nextSectionIndex = Math.max(currentSectionIndex - 1, 0);
    }

    const nextSection = sectionsRef.current[nextSectionIndex];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      setCurrentSectionIndex(nextSectionIndex);
    }
  };

  const handleIndicatorClick = (index: number) => {
    const nextSection = sectionsRef.current[index];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
      setCurrentSectionIndex(index);
    }
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Convertium Nature Microsite"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Header isVisible={currentSectionIndex === 1} />
      <main className={`${styles.home} ${inter.className}`}>
        <Section
          ref={(el) => {
            if (el) {
              sectionsRef.current[0] = el;
            }
          }}
          isVisible={currentSectionIndex === 0}
          index={0}
        />
        <Section
          ref={(el) => {
            if (el) {
              sectionsRef.current[1] = el;
            }
          }}
          isVisible={currentSectionIndex === 1}
          index={1}
        />
        <NavIndicators
          sections={[0, 1]}
          currentSectionIndex={currentSectionIndex}
          onIndicatorClick={handleIndicatorClick}
        />
      </main>
    </>
  );
}
