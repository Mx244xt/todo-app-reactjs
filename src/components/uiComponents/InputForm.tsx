import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface InputFormType {
  email: string;
  password: string;
  passwordConfirm: string;
  todo: string;
};

interface InputProps {
  title: string;
  type: string;
  id: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors<InputFormType>;
  placeholder: string;
};

const InputForm = ({ title, type, id, register, errors, placeholder }: InputProps) => {

  let error;
  switch (id) {
    case "email":
      error = errors.email?.message;
      break;
    case "password":
      error = errors.password?.message;
      break;
    case "passwordConfirm":
      error = errors.passwordConfirm?.message;
      break;
    case "todo":
      error = errors.todo?.message;
  };

  return (
    <>
      <label className='space-y-3 flex mt-5' htmlFor={type}>{title}</label>
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