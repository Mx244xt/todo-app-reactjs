import BackgroundImage from '../components/baseComponents/BackgroundImage';
import { Header, TodoFrom } from '../components/todoFormComponents';
import { ConfirmationDialogProvider } from '../context/ConfirmationDialogContext';

const Todos = () => {
  return (
    <div className='grid min-h-screen landscape:max-h-full grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <ConfirmationDialogProvider>
        <Header />
        <BackgroundImage url="../images/desk_work.jpeg" />
        <TodoFrom />
      </ConfirmationDialogProvider>
    </div>
  );
};

export default Todos;