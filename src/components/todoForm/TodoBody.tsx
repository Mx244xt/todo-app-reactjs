import { useEffect, useState } from 'react';
import { AddTask, TodoList } from '.';
import { useBlockBrowserBack } from '../../hooks';
import FormBody from '../base/FormBody';
import useTodos from './hooks/useTodos';
import { TodoType } from '@/types';
import ShowCompletedDropdown from './ShowCompletedDropdown';

const TodoBody = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [showTodo, setShowTodo] = useState<TodoType[]>([]);
  const { errors, isLoading, clearErrors, todoNotFound } = useTodos({ todos, setTodos });
  const { blockBrowserBack } = useBlockBrowserBack();
  blockBrowserBack();

  useEffect(() => {
    if (todos.length > 0) {
      return clearErrors("todoList");
    }
    todoNotFound();
  }, [todos]);

  return (
    <FormBody title={null}>
      <div className="w-full max-w-xl absolute top-16 flex flex-col items-center" >
        <div className='w-full max-w-xl mt-5 px-5'>
          <div className='w-full px-8 py-6 bg-white shadow-md rounded-lg'>
            <AddTask isLoading={isLoading} todos={todos} setTodos={setTodos} />
            {!isLoading && errors && <p className=' text-gray-400 flex justify-center'>{errors.todoList?.message}</p>}
            {/* <ShowCompletedDropdown todos={todos} setShowTodo={setShowTodo} /> */}
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </FormBody>
  );
};

export default TodoBody;