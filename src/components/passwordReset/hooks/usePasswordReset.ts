
import { ResponseAccountType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { newPasswordFromType, newPasswordFormValidationShema } from '../../../lib/validationShema';
import { useLocation } from 'react-router-dom';

const usePasswordReset = () => {
  const navigate = useNavigate();
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { logIn } = useCookiesHooks();
  const { passwordResetAuthConfirm } = useFirebaseApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<newPasswordFromType>({
    mode: 'onChange',
    resolver: zodResolver(newPasswordFormValidationShema)
  });

  const backToLoginForm = () => {
    navigate('/');
  };

  const passwordReset: SubmitHandler<newPasswordFromType> = async (data) => {
    startLoding();
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const oodCode = query.get('oodCode');
    if (oodCode == null) return;
    data = { ...data, code: oodCode };
    const response: ResponseAccountType = await passwordResetAuthConfirm(data);
    if (response.statusCode === 200) {
      return logIn(response.uid);
    }
    stopLoding();
    setError("passwordConfirm", {
      type: "manual",
      message: "認証情報が正しくありません。",
    });
    stopLoding();
    setTimeout(() => {
      clearErrors("passwordConfirm");
    }, 5000);
    return;
  };

  return {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, passwordReset }
  };
};

export default usePasswordReset;