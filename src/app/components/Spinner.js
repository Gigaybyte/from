import React from "react";

const Spinner = ({ size = "24", colors = ["blue", "purple", "indigo"], speedClasses = ["", "slow-spin", "faster-spin"] }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className={`relative w-${size} h-${size}`}>
        {colors.map((color, index) => (
          <div
            key={index}
            className={`absolute w-full h-full border-8 border-t-8 border-transparent rounded-full animate-spin ${speedClasses[index]} border-${color}-500`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Spinner;
