import React, { useState } from 'react';
import style from '@/styles/Carousel.module.scss';
import SwiperSlider from './SwiperSlider';

interface Slide {
  title: string;
  content: string;
}

const slides: Slide[] = [
  {
    title: 'Lorem ipsum #1',
    content: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.',
  },
  { title: 'Lorem ipsum #2', content: 'Aenean dignissim pellentesque felis sed egestas, ante et vulputate volutpat.' },
  { title: 'Lorem ipsum #3', content: 'Eros pede est, vitae luctus metus libero eu augue.' },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <>{/* <SwiperSlider /> */}</>
    // <div className={style['slider']}>
    //   <div className={style['slider__content']}>
    //     {slides.map((slide, index) => (
    //       <div
    //         key={index}
    //         className={`${style['slider__content']} ${index === currentIndex ? 'slide--active' : ''}`}
    //         style={{ display: index === currentIndex ? 'block' : 'none' }}
    //       >
    //         <h3>{slide.title}</h3>
    //         <p>{slide.content}</p>
    //       </div>
    //     ))}
    //   </div>
    //   <button
    //     className={style['slider__prev']}
    //     onClick={handlePrevClick}
    //   >
    //     &#10094;
    //   </button>
    //   <button
    //     className={style['slider__next']}
    //     onClick={handleNextClick}
    //   >
    //     &#10095;
    //   </button>
    // </div>
  );
};

export default Carousel;
