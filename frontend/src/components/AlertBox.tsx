import React, { useState, useEffect } from 'react';

interface AlertBoxProps {
  message: string;
  type: 'info' | 'error' | 'warning';
}

const AlertBox: React.FC<AlertBoxProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={`alert ${type}`}>
      <span className="alert__text">{message}</span>
      <span
        className="alert__close"
        onClick={() => setVisible(false)}
      ></span>
    </div>
  );
};

export default AlertBox;
