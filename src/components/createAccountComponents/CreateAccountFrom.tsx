
import { ResponseAccountType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAccountFormType, createAccountFormValidationShema } from 'lib/validationShema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useFirebaseApi from '../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../hooks';
import FormBody from '../baseComponents/FormBody';
import { ButtonForm, InputForm, Loading, Title } from '../uiComponents';

const CreateAccountFrom = () => {
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
  } = useForm<createAccountFormType>({
    mode: 'onChange',
    resolver: zodResolver(createAccountFormValidationShema)
  });

  const emptyEvent = () => { };

  const backToLoginForm = () => {
    navigate('/');
  };

  const createAccount: SubmitHandler<createAccountFormType> = async (data) => {
    startLoding();
    const response: ResponseAccountType = await createEmailAccount(data);
    if (response.statusCode === 200) {
      logIn(response.uid);
    } else if (response.statusCode === 403) {
      setError("passwordConfirm", {
        type: "manual",
        message: "このメールアドレスはすでに使用されています。",
      });
      stopLoding();
      setTimeout(() => {
        clearErrors("password");
      }, 5000);
    }
  };

  return (
    <FormBody>
      <Title title="アカウントの新規作成" />
      <div className='w-full max-w-xl mt-5 px-5'>
        <form className="w-full px-8 py-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit(createAccount)}>
          <InputForm
            title="メールアドレス"
            type="email"
            id="email"
            register={register("email")}
            errors={errors}
            placeholder='登録するメールアドレスを入力してください。'
          />
          <InputForm
            title="パスワード"
            type="password"
            id="password"
            register={register("password")}
            errors={errors}
            placeholder='登録するパスワードを入力してください。'
          />
          <InputForm
            title="パスワード確認"
            type="password"
            id="passwordConfirm"
            register={register("passwordConfirm")}
            errors={errors}
            placeholder='もう一度パスワードを入力してください。'
          />
          <div className='m-5'></div>
          {isLoading && <Loading />}
          <ButtonForm
            title="新規アカウント作成"
            type="submit"
            icon='/images/create_user_icon.png'
            textColor="text-white"
            bgColor='bg-blue-500'
            clickEvent={emptyEvent}
            disabled={false}
          />
          <div className='m-5'></div>
          <ButtonForm
            title="戻る"
            type="button"
            icon='/images/back_icon.png'
            textColor="text-black"
            bgColor='bg-slate-300'
            clickEvent={backToLoginForm}
            disabled={false}
          />
        </form>
      </div>
    </FormBody>
  );
};

export default CreateAccountFrom;