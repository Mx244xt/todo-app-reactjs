import PrivacyPolicy from '../../data/PrivacyPolicy';
import TermsOfUse from '../../data/TermsOfUse';
import FormBody from '../base/FormBody';
import ModalButton from '../dialog/ModalButton';
import ModalDialog from '../dialog/ModalDialog';
import { ButtonFrom, InputForm, InputPassword, Loading } from '../uiComponents';
import useCreateAccount from './hooks/useCreateAccount';

const CreateAccountFrom = () => {
  const {
    state: { isLoading, isEnable, errors },
    action: { register, handleSubmit, backToLoginForm, createAccount, setIsEnable }
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
        <input id='agree' className='mr-1' type='checkbox' onClick={() => setIsEnable('isChecked')} disabled={!isEnable.termsOfUse || !isEnable.privacyPolicy} />
        <div className='flex mb-1 flex-col md:flex-row'>
          <div className='flex'>
            <ModalButton title="利用規約" message={TermsOfUse()} disabled={isEnable.termsOfUse} action={() => setIsEnable('termsOfUse')} />
            <p>と</p>
          </div>
          <div className='flex'>
            <ModalButton title="プライバシーポリシー" message={PrivacyPolicy()} disabled={isEnable.privacyPolicy} action={() => setIsEnable('privacyPolicy')} />
            <p>に同意する。</p>
          </div>
          <ModalDialog action={() => setIsEnable('')} />
        </div>
      </div>
      {isLoading && <Loading />}
      <ButtonFrom
        title="新規アカウント作成"
        type="submit"
        icon='/images/create_user_icon.png'
        textColor="text-white"
        bgColor={isEnable.isChecked ? 'bg-blue-300' : 'bg-blue-500'}
        disabled={isEnable.isChecked}
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