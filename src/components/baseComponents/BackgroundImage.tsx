interface BackImageType {
  url: string;
};

const BackgroundImage = ({ url }:BackImageType) => {
  return (
    <div className='absolute lg:relative -z-10'>
      <picture>
        <img className='h-screen w-screen landscape:h-max lg:landscape:h-screen object-right-bottom object-cover opacity-60' src={url} alt='' />
      </picture>
    </div>
  );
};

export default BackgroundImage;