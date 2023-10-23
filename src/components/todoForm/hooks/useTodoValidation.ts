import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCookiesHooks } from '../../../hooks';
import { todoFormType, todoValidationShema } from '../../../lib/validationShema';

const useTodoValidation = () => {

  const { cookies, elapsedTime, updateSessionTime, logOut } = useCookiesHooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    clearErrors,
  } = useForm<todoFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(todoValidationShema),
  });

  const badResponse = () => setError("todo", {
    type: "manual",
    message: "データの作成に失敗しました。",
  });

  const idExpired = () => setError("root", {
    type: "manual",
    message: "IDの有効期限が切れています。",
  });

  const idHasExpired = () => {
    idExpired();
    return setTimeout(() => {
      clearErrors("todo");
      logOut();
    }, 3000);
  };

  const sessionCheck = () => {
    clearErrors("todo");
    elapsedTime();
    updateSessionTime();
  };

  return { errors, register, handleSubmit, clearErrors, idHasExpired, badResponse, resetField, cookies, sessionCheck };
};

export default useTodoValidation;