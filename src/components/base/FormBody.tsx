import { ReactNode } from "react";

const FormBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="col-span-1 flex flex-col items-center justify-center  lg:min-h-screen px-5 lg:bg-[#EDF0F2] landscape:mt-24 md:landscape:mt-0" >
      {children}
    </div>
  );
};

export default FormBody;