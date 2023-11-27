
import { ResponseAccountType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { accountFormType, accountFormValidationShema } from '../../../lib/validationShema';

const usePasswordReset = () => {
  const navigate = useNavigate();
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { logIn } = useCookiesHooks();
  const { submitPasswordResetEmail } = useFirebaseApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<accountFormType>({
    mode: 'onChange',
    resolver: zodResolver(accountFormValidationShema)
  });

  const backToLoginForm = () => {
    navigate('/');
  };

  const passwordReset: SubmitHandler<accountFormType> = async (data) => {
    startLoding();
    const response: ResponseAccountType = await submitPasswordResetEmail(data);
    if (response.statusCode === 200) {
      return logIn(response.uid);
    }
    stopLoding();
    //TODO:エラーメッセージ
    return;
  };

  return {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, passwordReset }
  };
};

export default usePasswordReset;