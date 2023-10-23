import { FormEventHandler, ReactNode } from "react";
import { Title } from "../uiComponents";

interface SubmitType {
  children: ReactNode;
  submitEvent: FormEventHandler<HTMLFormElement> | undefined;
  title: string;
}

interface NoSubmitType {
  children: ReactNode;
  title: null;
}

type FormBodyType = SubmitType | NoSubmitType

const FormBody = ({ ...props }: FormBodyType) => {
  return (
    <div className="col-span-1 flex flex-col items-center justify-center  lg:min-h-screen px-5 lg:bg-[#EDF0F2] landscape:mt-24 md:landscape:mt-0" >
      {props.title == undefined ? <>{props.children}</> :
        <>
          <Title title={props.title} />
          <form className="w-full max-w-xl mt-5 p-5 pb-3 bg-white shadow-md rounded-lg" onSubmit={props.submitEvent}>
            {props.children}
          </form>
        </>
      }
    </div>
  );
};

export default FormBody;