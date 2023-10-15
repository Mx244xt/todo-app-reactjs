import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { LoginFormType, LoginFormValidationShema } from '../../../lib/validationShema';
import { ResponseAccountType } from '../../../types';

const useLogin = () => {
  const { isLoading, startLoding, stopLoding } = useLoading();
  const [userState, setUserState] = useState("");
  const navigate = useNavigate();
  const { logIn, logOut } = useCookiesHooks();
  const { signInEmailPassword } = useFirebaseApi();

  useEffect(() => {
    logOut();
  }, []);

  useEffect(() => {
    if (userState) {
      logIn(userState);
      stopLoding();
    }
  }, [userState]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormType>({
    mode: 'onBlur',
    resolver: zodResolver(LoginFormValidationShema),
    defaultValues: { email: "test@example.com", password: "Abc@1234" }
  });

  const loginEmail: SubmitHandler<LoginFormType> = async (data) => {
    startLoding();
    const { email, password } = data;
    const response: ResponseAccountType = await signInEmailPassword({ email, password });
    if (response.statusCode === 200) {
      setUserState(response.uid);
    } else {
      setError("password", {
        type: "manual",
        message: "メールアドレスまたは、パスワードが間違っています。",
      });
      stopLoding();
      setTimeout(() => {
        clearErrors("password");
      }, 5000);
    }
  };


  const newAccount = () => {
    navigate("createAccount");
  };

  return {
    state: { isLoading, errors },
    action: { register, handleSubmit, loginEmail, newAccount }
  };
};

export default useLogin;