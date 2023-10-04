import { TodoType } from '@/types';
import Todo from './Todo';

interface TodoPropsTypes {
  todos: TodoType[];
  deleteTask: (data: string) => void;
};

const TodoList = ({ todos, deleteTask }: TodoPropsTypes) => {
  return (
    <>
      <ul className='space-y-3'>
        {todos.map((todo: TodoType) => (
          < Todo key={todo.id} todo={todo} deleteTask={deleteTask} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;