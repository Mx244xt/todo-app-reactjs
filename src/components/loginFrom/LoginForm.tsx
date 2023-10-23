import FormBody from '../base/FormBody';
import { ButtonFrom, InputForm, InputPassword, Loading } from '../uiComponents';
import useLogin from './hooks/useLogin';

const LoginForm: React.FC = () => {
  const {
    state: { isLoading, errors },
    action: { register, handleSubmit, loginEmail, newAccount, passwordReset }
  } = useLogin();

  return (
    <FormBody title='Todo App React.js' submitEvent={handleSubmit(loginEmail)}>
      <InputForm
        title="メールアドレス"
        type="email"
        id="email"
        register={register("email")}
        errors={errors}
        placeholder='todo@example.com'
      />
      <InputPassword
        title="パスワード"
        id="password"
        register={register("password")}
        errors={errors}
        placeholder='Abc@1234'
      />
      <div className='m-5'></div>
      <p className='text-red-400'>{errors.login?.message}</p>
      {isLoading && <Loading />}
      <ButtonFrom
        title="ログイン"
        type="submit"
        icon='/images/mail_white_icon.png'
        textColor="text-white"
        bgColor={isLoading ? 'bg-blue-300' : 'bg-blue-500'}
        disabled={isLoading}
      />
      <div className='m-5'></div>
      <ButtonFrom
        title={"アカウントの新規作成"}
        type={"button"}
        textColor="text-white"
        bgColor="bg-slate-500"
        icon='/images/create_user_icon.png'
        clickEvent={newAccount}
        disabled={isLoading}
      />
      <button className='mt-5' type='button' onClick={passwordReset}>パスワードを忘れた方はこちら</button>
    </FormBody>
  );
};

export default LoginForm;