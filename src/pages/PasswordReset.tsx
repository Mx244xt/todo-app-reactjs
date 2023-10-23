import PasswordResetFrom from '../components/passwordReset/PasswordResetFrom';
import BackgroundImage from '../components/base/BackgroundImage';

const PasswordReset = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <BackgroundImage url="/images/desk_work.jpeg" />
      <PasswordResetFrom />
    </div>);
};

export default PasswordReset;