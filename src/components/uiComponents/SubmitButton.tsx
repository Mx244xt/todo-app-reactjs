interface ButtomProps {
  title: string;
  textColor: string;
  bgColor: string;
  icon: string
  disabled: boolean;
}

const SubmitButton = ({ title, textColor, bgColor, icon, disabled }: ButtomProps) => {
  return (
    <div className={`w-full border rounded transform  md:hover:scale-95 duration-300 flex justify-center items-center text-center border-gray-300 ${textColor} ${bgColor} hover:${bgColor}`}>
      {icon &&
        <div className='h-7 w-7 mx-2'>
          <picture>
            <img src={icon} alt="" />
          </picture>
        </div>
      }
      <button
        className={`w-full px-2 py-2`}
        type="submit"
        disabled={disabled}
      >
        {title}
      </button >
    </div>
  );
};

export default SubmitButton;