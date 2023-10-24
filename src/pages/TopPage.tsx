import BackgroundImage from '../components/base/BackgroundImage';
import LoginForm from '../components/loginFrom/LoginForm';

function TopPage() {
  return (
    <div className='grid min-h-screen landscape:max-h-full grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <BackgroundImage url="/images/desk_work.jpeg" />
      <LoginForm />
    </div >);
}

export default TopPage;
