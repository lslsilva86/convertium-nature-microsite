import React from 'react';

interface LoaderProps {
  elmClass?: string;
}

const Loader: React.FC<LoaderProps> = ({ elmClass }) => {
  const loaderClasses = `loader ${elmClass}`;

  return <div className={loaderClasses}></div>;
};

export default Loader;
