import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import style from '@/styles/Carousel.module.scss';

interface Slide {
  title: string;
  content: string;
}

const slides: Slide[] = [
  {
    title: 'Lorem ipsum #1',
    content: 'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.',
  },
  { title: 'Lorem ipsum #2', content: ' Aenean dignissim pellentesque felis sed egestas, ante et vulputate volutpat.' },
  { title: 'Lorem ipsum #3', content: 'Eros pede est, vitae luctus metus libero eu augue.' },
  { title: 'Lorem ipsum #4', content: 'Aenean dignissim pellentesque felis sed egestas, ante et vulputate volutpat.' },
  { title: 'Lorem ipsum #5', content: 'Eros pede est, vitae luctus metus libero eu augue.' },
];

const Carousel: React.FC = () => {
  return (
    <div className={style['carousel-wrapper']}>
      <div className={style['carousel']}>
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={style['carousel__content']}>
                <h3>{slide.title}</h3>
                <p>{slide.content}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
