
import { ResponseAccountType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReducer } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { accountFormType, accountFormValidationShema } from '../../..//lib/validationShema';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';

type initialStateType = {
  termsOfUse: boolean,
  privacyPolicy: boolean,
  isEnable: boolean,
  isChecked: boolean
};

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

  const reducerFunc = (checkState: initialStateType, action: string) => {
    switch (action) {
      case 'termsOfUse':
        return { ...checkState, termsOfUse: initialState.termsOfUse = true };
      case 'privacyPolicy':
        return { ...checkState, privacyPolicy: initialState.privacyPolicy = true };
      case 'isChecked':
        return { ...checkState, isChecked: initialState.isChecked = !checkState.isChecked };
      default:
        return checkState;
    }
  };

  const initialState = {
    termsOfUse: false,
    privacyPolicy: false,
    isEnable: true,
    isChecked: true
  };

  const [isEnable, setIsEnable] = useReducer(reducerFunc, initialState);

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
    state: { isLoading, isEnable, errors },
    action: { register, handleSubmit, backToLoginForm, createAccount, setIsEnable }
  };
};

export default useCreateAccount;