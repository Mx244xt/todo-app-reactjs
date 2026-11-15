interface EventButtonType {
  type: "button" | undefined
  clickEvent: (data: React.MouseEvent<HTMLButtonElement>) => void | null | Promise<void>;
  title: string;
  textColor: string;
  bgColor: string;
  icon: string
  disabled: boolean;
}

interface SubmitButtonType {
  type: "submit" | undefined
  title: string;
  textColor: string;
  bgColor: string;
  icon?: string
  disabled: boolean;
}

type ButtomPropsType = SubmitButtonType | EventButtonType;

const ButtonFrom = ({ ...props }: ButtomPropsType) => {
  return (
    <div className={`w-full border rounded transform ${!props.disabled && 'md:hover:scale-95 duration-300'} flex justify-center items-center text-center border-gray-300 ${props.textColor} ${props.bgColor} hover:${props.bgColor}`}>
      {props.icon &&
        <div className='h-7 w-7 mx-2'>
          <picture>
            <img src={props.icon} alt="" />
          </picture>
        </div>
      }
      {
        props.type === 'button'
          ? <button
            className={`w-full px-2 py-2`}
            type={props.type}
            onClick={props.clickEvent}
            disabled={props.disabled}
          >
            {props.title}
          </button >
          : <button
            className={`w-full px-2 py-2`}
            type={props.type}
            disabled={props.disabled}
          >
            {props.title}
          </button >
      }
    </div>
  );
};

export default ButtonFrom;