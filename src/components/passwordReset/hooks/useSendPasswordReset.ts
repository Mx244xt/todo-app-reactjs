
import { ResponseAccountType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useLoading } from '../../../hooks';
import { emailFromType, emailValidationShema } from '../../../lib/validationShema';

const usePasswordReset = () => {
  const navigate = useNavigate();
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { sendPasswordResetEmail } = useFirebaseApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<emailFromType>({
    mode: 'onChange',
    resolver: zodResolver(emailValidationShema)
  });

  const backToLoginForm = () => {
    navigate('/');
  };

  const sendPasswordReset: SubmitHandler<emailFromType> = async (data) => {
    startLoding();
    const response: ResponseAccountType = await sendPasswordResetEmail(data);
    if (response.statusCode === 200) {
      setError("email", {
        type: "manual",
        message: "メールアドレスの送信に成功しました。",
      });
      stopLoding();
      setTimeout(() => {
        clearErrors("email");
      }, 5000);
      return;
    }
    setError("email", {
      type: "manual",
      message: "メールアドレスの送信が失敗しました。",
    });
    stopLoding();
    setTimeout(() => {
      clearErrors("email");
    }, 5000);
    return;
  };

  return {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, sendPasswordReset }
  };
};

export default usePasswordReset;