import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from '@/styles/Section.module.scss';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';

interface SectionProps {
  isVisible: boolean;
  index: number;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(({ isVisible, index }, ref) => {
  const controls = useAnimation();

  React.useEffect(() => {
    if (isVisible) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isVisible, controls]);

  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.section
      ref={ref}
      className={styles.section}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <div>
        {index === 0 && <SlideOne controls={controls} />}
        {index === 1 && <SlideTwo controls={controls} />}
      </div>
    </motion.section>
  );
});

Section.displayName = 'Section';

export default Section;
