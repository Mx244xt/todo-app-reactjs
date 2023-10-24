import { useState } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";

interface InputPasswordType {
  password: string;
  passwordConfirm: string;
}

interface InputPasswordProps {
  title: string;
  id: string;
  register: UseFormRegisterReturn;
  errors: FieldErrors<InputPasswordType>;
  placeholder: string;
}

const InputPassword = ({ title, id, register, errors, placeholder }: InputPasswordProps) => {

  let error;
  switch (id) {
    case "password":
      error = errors.password?.message;
      break;
    case "passwordConfirm":
      error = errors.passwordConfirm?.message;
      break;
  }

  const [showPassword, setShowPassword] = useState(false);
  const switchShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <label className='space-y-3 flex mt-5' htmlFor="password">{title}</label>
      <div className="flex items-center">
        <input
          className='w-full py-2 px-2 rounded shadow border-gray-400 border'
          type={showPassword ? "text" : "password"}
          id={id}
          {...register}
          placeholder={placeholder}
        />
        <button className="w-7 -ml-11" type="button" onClick={switchShowPassword}>
          {showPassword ? <img src="/images/showPassword.png" alt="" /> : <img src="/images/password.png" alt="" />} 
        </button>
      </div>
      <p className='text-red-400'>{error}</p>
    </>
  );
};

export default InputPassword;