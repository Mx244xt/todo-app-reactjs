import FormBody from '../base/FormBody';
import { InputForm, Loading, SubmitButton, Title } from '../uiComponents';
import useLogin from './hooks/useLogin';

const LoginForm: React.FC = () => {
  const {
    state: { isLoading, errors },
    action: { register, handleSubmit, loginEmail, newAccount }
  } = useLogin();

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
        <SubmitButton
          title="ログイン"
          icon='/images/mail_white_icon.png'
          textColor="text-white"
          bgColor={isLoading ? 'bg-blue-300' : 'bg-blue-500'}
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