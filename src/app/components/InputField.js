
const InputField = ({ id, value, onChange, placeholder, required, type = "text" }) => {
    return (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
        placeholder={placeholder}
        required={required}
      />
    );
  };
  
  export default InputField;
  