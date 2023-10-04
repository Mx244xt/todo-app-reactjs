import BackgroundImage from '../components/baseComponents/BackgroundImage';
import CreateAccountFrom from '../components/createAccountComponents/CreateAccountFrom';

const CreateAccount = () => {
  return (
    <div className='grid min-h-screen grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <BackgroundImage url="/images/desk_work.jpeg" />
      <CreateAccountFrom />
    </div>);
};

export default CreateAccount;