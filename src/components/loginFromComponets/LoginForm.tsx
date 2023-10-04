import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFirebaseApi from '../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../hooks';
import { LoginFormType, LoginFormValidationShema } from '../../lib/validationShema';
import { ResponseAccountType } from '../../types';
import { ButtonForm, InputForm, Loading, Title } from '../uiComponents';
import FormBody from '../baseComponents/FormBody';

const LoginForm: React.FC = () => {
  const { isLoading, startLoding, stopLoding } = useLoading();
  const [userState, setUserState] = useState("");
  const navigate = useNavigate();
  const { logIn, logOut } = useCookiesHooks();
  const { signInEmailPassword } = useFirebaseApi();

  useEffect(() => {
    logOut()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userState) {
      logIn(userState);
      stopLoding();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const response: ResponseAccountType = await signInEmailPassword(email, password);
    if (response.statusCode === 200) {
      setUserState(response.uid);
    } else {
      setError("password", {
        type: "manual",
        message: "メールアドレスまたは、パスワードが間違っています。",
      })
      stopLoding();
      setTimeout(() => {
        clearErrors("password")
      }, 5000);
    };
  };

  const emptyEvent = () => { };

  const newAccount = () => {
    navigate("createAccount");
  };

  return (
    <FormBody>
      <Title title="Nextjs 13 Todo App" />
      <form className="w-full max-w-xl mt-5 px-5 py-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit(loginEmail)}>
        <InputForm
          title="メールアドレス"
          type="email"
          id="email"
          register={register("email")}
          errors={errors}
          placeholder='メールアドレスを入力してください。'
        />
        <InputForm
          title="パスワード"
          type="password"
          id="password"
          register={register("password")}
          errors={errors}
          placeholder='パスワードを入力してください。'
        />
        <div className='m-5'></div>
        {isLoading && <Loading />}
        <ButtonForm
          title="ログイン"
          type="submit"
          icon='/images/mail_white_icon.png'
          textColor="text-white"
          bgColor={isLoading ? 'bg-blue-300' : 'bg-blue-500'}
          clickEvent={() => emptyEvent()}
          disabled={isLoading}
        />
        <div className='m-5'></div>
        <p className='text-red-400'>{errors.login?.message}</p>
        <button className='mt-5' type='button' onClick={newAccount}>アカウントの新規作成はこちら</button>
      </form>
    </FormBody>
  );
};

export default LoginForm;