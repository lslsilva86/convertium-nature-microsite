import React, { useEffect, useState } from 'react';

interface ResponsiveBgImageProps {
  backgroundImages: {
    xl: string;
    md: string;
    sm: string;
  };
}

const ResponsiveBgImage: React.FC<ResponsiveBgImageProps> = ({ backgroundImages }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth;

      if (width >= 1920) {
        setBackgroundImage(backgroundImages.xl);
      } else if (width >= 1280) {
        setBackgroundImage(backgroundImages.md);
      } else if (width >= 800) {
        setBackgroundImage(backgroundImages.sm);
      } else {
        setBackgroundImage(backgroundImages.sm);
      }
    };

    updateBackgroundImage();
    window.addEventListener('resize', updateBackgroundImage);

    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, [backgroundImages]);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL as string}${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};

export default ResponsiveBgImage;
