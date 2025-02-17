import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const ReactIconSpinner = ({ message = 'working' }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center">
        <FaSpinner className="animate-spin text-white text-4xl" />
        <p className="mt-4 text-xl font-bold text-white">{message}</p>
      </div>
    </div>
  );
};

export default ReactIconSpinner;
