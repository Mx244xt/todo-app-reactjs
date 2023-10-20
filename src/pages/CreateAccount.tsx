import BackgroundImage from '../components/base/BackgroundImage';
import CreateAccountFrom from '../components/createAccount/CreateAccountFrom';

const CreateAccount = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <BackgroundImage url="/images/desk_work.jpeg" />
      <CreateAccountFrom />
    </div>);
};

export default CreateAccount;