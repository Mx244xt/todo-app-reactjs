import BackgroundImage from '../components/base/BackgroundImage';
import { Header, TodoBody } from '../components/todoForm';

const TodoFrom = () => {
  return (
    <div className='grid min-h-screen landscape:max-h-full grid-cols-1 overflow-hidden  lg:grid-cols-2'>
      <Header />
      <BackgroundImage url="../images/desk_work.jpeg" />
      <TodoBody />
    </div>
  );
};

export default TodoFrom;