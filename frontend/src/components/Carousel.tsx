import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Autoplay } from 'swiper/modules';
import style from '@/styles/Carousel.module.scss';
import axios from 'axios';
import Loading from './Loader';
import AlertBox from './AlertBox';

interface Slide {
  id: number;
  title: string;
  description: string;
}

interface ApiResponse {
  slides: Slide[];
}

const Carousel: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL as string}/carousel`);
        setSlides(response.data.slides);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch slides:', error);
        setError('Failed to fetch slides');
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (error) {
    return (
      <AlertBox
        message={error}
        type="error"
      />
    );
  }

  return (
    <div className={style['carousel']}>
      <>{loading && <Loading />}</>
      <>
        {slides.length > 0 && (
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
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={style['carousel__content']}>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </>
    </div>
  );
};

export default Carousel;
