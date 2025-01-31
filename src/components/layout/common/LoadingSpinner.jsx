const Spinner = ({ size = "8", className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent border-blue-500 h-${size} w-${size}`}
      ></div>
    </div>
  );
};

export default Spinner;
