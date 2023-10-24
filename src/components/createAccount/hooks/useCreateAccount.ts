
import { ResponseAccountType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { accountFormType, accountFormValidationShema } from '../../..//lib/validationShema';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';

const useCreateAccount = () => {
  const navigate = useNavigate();
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { logIn } = useCookiesHooks();
  const { createEmailAccount } = useFirebaseApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<accountFormType>({
    mode: 'onChange',
    resolver: zodResolver(accountFormValidationShema)
  });

  const backToLoginForm = () => {
    navigate('/');
  };

  const createAccount: SubmitHandler<accountFormType> = async (data) => {
    startLoding();
    const response: ResponseAccountType = await createEmailAccount(data);
    if (response.statusCode === 200) {
      logIn(response.uid);
      return;
    }
    if (response.statusCode === 403) {
      setError("passwordConfirm", {
        type: "manual",
        message: "このメールアドレスはすでに使用されています。",
      });
      stopLoding();
      setTimeout(() => {
        clearErrors("password");
      }, 5000);
      return;
    }
  };

  return {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, createAccount }
  };
};

export default useCreateAccount;