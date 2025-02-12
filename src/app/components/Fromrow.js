
const Row = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex flex-wrap -mx-3 mb-4 justify-start ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Row;
