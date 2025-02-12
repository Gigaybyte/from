import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 
import { motion } from 'framer-motion'; 

const Modal = ({ message, isOpen, closeModal, type }) => {
  if (!isOpen) return null;

  const isError = type === 'error';
  const icon = isError ? <FaTimesCircle size={40} /> : <FaCheckCircle size={40} />;
  const iconColor = isError ? 'text-red-600' : 'text-green-600';
  const bgColor = isError ? 'bg-red-500' : 'bg-green-500';
  const buttonHoverColor = isError ? 'hover:bg-red-700' : 'hover:bg-green-700';
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"
      variants={modalAnimation}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-xl">
        <div className="text-center flex flex-col items-center">
          <div className="flex items-center space-x-3">
            <div className={`text-4xl ${iconColor}`}>{icon}</div>
            <h2 className={`text-2xl font-semibold ${iconColor} uppercase tracking-wider`}>
              {isError ? 'Error' : 'Success'}
            </h2>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 text-lg">{message}</p>
          </div>
          <div className="mt-8">
            <button
              onClick={closeModal}
              className={`py-3 px-6 rounded-lg text-white ${bgColor} ${buttonHoverColor} transition-all duration-300 transform hover:scale-105`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
