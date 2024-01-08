import BackgroundImage from '../components/base/BackgroundImage';
import { Header, TodoBody } from '../components/todoForm';
import BackgroundFrom from './BackgroundFrom';

const TodoFrom = () => {
  return (
    <BackgroundFrom>
      <Header />
      <TodoBody />
    </BackgroundFrom>
  );
};

export default TodoFrom;