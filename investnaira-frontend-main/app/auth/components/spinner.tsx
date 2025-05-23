import React from 'react';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
  </div>
);

export default LoadingSpinner;