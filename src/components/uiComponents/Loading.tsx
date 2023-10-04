const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin h-5 w-5 border-4 border-gray-400 rounded-full border-t-transparent"></div>
      <p className=' m-5 flex justify-center items-center text-2xl text-gray-400'>Loading...</p>
    </div>
  );
};

export default Loading;