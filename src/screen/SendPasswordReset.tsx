import BackgroundImage from '../components/base/BackgroundImage';
import SendPasswordResetForm from '../components/passwordReset/SendPasswordResetForm';

const SendPasswordReset = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <BackgroundImage url="/images/desk_work.jpeg" />
      <SendPasswordResetForm />
    </div>);
};

export default SendPasswordReset;