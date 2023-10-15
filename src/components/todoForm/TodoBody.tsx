import { AddTask, TodoList } from '.';
import { useBlockBrowserBack } from '../../hooks';
import FormBody from '../base/FormBody';
import { Title } from '../uiComponents';
import useTodos from './hooks/useTodos';

const TodoBody = () => {
  const {
    state: { errors }
  } = useTodos();

  const { blockBrowserBack } = useBlockBrowserBack();
  blockBrowserBack();

  return (
    //TODO トースター追加する
    <FormBody>
      <div className="w-full max-w-xl absolute top-16 flex flex-col items-center" >
        <Title title="Nextjs 13 Todo App" />
        <div className='w-full max-w-xl mt-5 px-5'>
          <div className='w-full px-8 py-6 bg-white shadow-md rounded-lg'>
            <AddTask />
            <TodoList />
            {errors && <p className=' text-gray-400 flex justify-center'>{errors.todoList?.message}</p>}
          </div>
        </div>
      </div>
    </FormBody>
  );
};

export default TodoBody;