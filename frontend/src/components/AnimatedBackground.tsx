import React, { useEffect } from 'react';

interface AnimatedBackgroundProps {}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = () => {
  useEffect(() => {
    const particleNum = 500;
    const container = document.querySelector('.background-container');

    if (container) {
      for (let i = 1; i <= particleNum; i++) {
        const circleContainer = document.createElement('div');
        circleContainer.className = 'circle-container';
        const circle = document.createElement('div');
        circle.className = 'circle';
        circleContainer.appendChild(circle);
        container.appendChild(circleContainer);
      }
    }
  }, []);
  return (
    <div>
      <div className="background-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
