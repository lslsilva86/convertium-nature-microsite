import React from 'react';
import style from '@/styles/DownArrowButton.module.scss';

interface Props {
  onClick: () => void;
  isVisible: boolean;
}

const DownArrowButton: React.FC<Props> = ({ onClick, isVisible }) => {
  return (
    <>
      {isVisible && (
        <div className={style.downArrow}>
          <div
            className={style['downArrow__btn']}
            onClick={onClick}
          >
            <div className={style['downArrow__chevron']}></div>
            <div className={style['downArrow__chevron']}></div>
            <div className={style['downArrow__chevron']}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownArrowButton;
