import React, { useEffect, useState } from 'react';

const ResponsiveBgImage: React.FC = () => {
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    const updateBackgroundImage = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width >= 1920) {
        setBackgroundImage('/images/img-1920x1200.jpg');
      } else if (width >= 1280) {
        setBackgroundImage('/images/img-1280x800.jpg');
      } else if (width >= 800) {
        setBackgroundImage('/images/img-800x368.jpg');
      } else {
        setBackgroundImage('/images/img-800x368.jpg');
      }
    };

    updateBackgroundImage();
    window.addEventListener('resize', updateBackgroundImage);

    return () => {
      window.removeEventListener('resize', updateBackgroundImage);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
  );
};

export default ResponsiveBgImage;
