import FormBody from '../base/FormBody';
import ModalButton from '../dialog/ModalButton';
import ModalDialog from '../dialog/ModalDialog';
import { ButtonFrom, InputForm, InputPassword, Loading } from '../uiComponents';
import useCreateAccount from './hooks/useCreateAccount';
import TermsOfUse from '../../lib/TermsOfUse';
import PrivacyPolicy from '../../lib/PrivacyPolicy';

const CreateAccountFrom = () => {
  const {
    state: { isLoading, isChecked, errors },
    action: { handleCheck, register, handleSubmit, backToLoginForm, createAccount }
  } = useCreateAccount();
  return (
    <FormBody title='アカウントの新規作成' submitEvent={handleSubmit(createAccount)}>
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
      <InputPassword
        title="パスワード確認"
        id="passwordConfirm"
        register={register("passwordConfirm")}
        errors={errors}
        placeholder='Abc@1234'
      />
      <div className='m-3'></div>
      <div className='flex flex-row'>
        <input id='agree' className='mr-1' type='checkbox' onClick={handleCheck} />
        <div className='flex mb-1 flex-col md:flex-row'>
          <ModalButton title="利用規約と" message={TermsOfUse()} />
          <ModalButton title="プライバシーポリシー" message={PrivacyPolicy()} /><p>に同意する。</p>
          <ModalDialog action={handleCheck} />
        </div>
      </div>
      {isLoading && <Loading />}
      <ButtonFrom
        title="新規アカウント作成"
        type="submit"
        icon='/images/create_user_icon.png'
        textColor="text-white"
        bgColor='bg-blue-500'
        disabled={isChecked}
      />
      <div className='m-5'></div>
      <ButtonFrom
        title="戻る"
        type="button"
        icon='/images/back_icon.png'
        textColor="text-black"
        bgColor='bg-slate-300'
        clickEvent={backToLoginForm}
        disabled={false}
      />
    </FormBody>
  );
};

export default CreateAccountFrom;