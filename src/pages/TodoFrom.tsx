import BackgroundImage from '../components/base/BackgroundImage';
import { Header, TodoBody } from '../components/todoForm';
import { ConfirmationDialogProvider } from '../providers/ConfirmationDialogContext';

const TodoFrom = () => {
  return (
    <div className='grid min-h-screen landscape:max-h-full grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <ConfirmationDialogProvider>
        <Header />
        <BackgroundImage url="../images/desk_work.jpeg" />
        <TodoBody />
      </ConfirmationDialogProvider>
    </div>
  );
};

export default TodoFrom;