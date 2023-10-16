import FormBody from '../base/FormBody';
import { EventButton, InputForm, InputPassword, Loading, SubmitButton, Title } from '../uiComponents';
import useCreateAccount from './hooks/useCreateAccount';

const CreateAccountFrom = () => {
  const {
    state: { isLoading, errors },
    action: { register, handleSubmit, backToLoginForm, createAccount }
  } = useCreateAccount();
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
          <InputPassword
            title="パスワード"
            id="password"
            register={register("password")}
            errors={errors}
            placeholder='登録するパスワードを入力してください。'
          />
          <InputPassword
            title="パスワード確認"
            id="passwordConfirm"
            register={register("passwordConfirm")}
            errors={errors}
            placeholder='もう一度パスワードを入力してください。'
          />
          <div className='m-5'></div>
          {isLoading && <Loading />}
          <SubmitButton
            title="新規アカウント作成"
            icon='/images/create_user_icon.png'
            textColor="text-white"
            bgColor='bg-blue-500'
            disabled={false}
          />
          <div className='m-5'></div>
          <EventButton
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