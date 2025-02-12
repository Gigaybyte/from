
const Row = ({ children, className = "", ...props }) => {
    return (
      <div
        className={`w-full md:w-2/4 px-3 mb-6 md:mb-0 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export default Row;
  