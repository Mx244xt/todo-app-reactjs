import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface InputFormType {
  email: string;
  todo: string;
}

interface InputProps {
  title: string;
  type: string;
  id: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors<InputFormType>;
  placeholder: string;
}

const InputForm = ({ title, type, id, register, errors, placeholder }: InputProps) => {

  let error;
  switch (id) {
    case "email":
      error = errors.email?.message;
      break;
    case "todo":
      error = errors.todo?.message;
  }

  return (
    <>
      {title !== "" && <label className='space-y-3 flex mt-5' htmlFor={type}>{title}</label>}
      <input
        className='w-full py-2 px-2 rounded shadow border-gray-400 border'
        type={type}
        id={id}
        {...register}
        placeholder={placeholder}
      />
      <p className='text-red-400'>{error}</p>
    </>
  );
};

export default InputForm;