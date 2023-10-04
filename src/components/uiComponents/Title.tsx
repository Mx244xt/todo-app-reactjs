const Title = ({ title }: { title: string }) => {
  return (
    <h1 className='text-3xl sm:text-4xl font-bold text-gray-700 '>{title}</h1>
  );
};

export default Title;