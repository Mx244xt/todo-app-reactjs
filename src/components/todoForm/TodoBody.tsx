import { TodoType } from '@/types';
import { useEffect, useState } from 'react';
import { AddTask, TodoList } from '.';
import { useBlockBrowserBack } from '../../hooks';
import FormBody from '../base/FormBody';
import ShowCompletedDropdown from './ShowCompletedDropdown';
import useShowCompletedDropdown from './hooks/useShowCompletedDropdown';
import useGetTodos from './hooks/useGetTodos';
import ShowTodosSort from './ShowTodosSort';
import useShowTodosSort from './hooks/useShowTodosSort';

const TodoBody = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [showTodos, setShowTodos] = useState<TodoType[]>([]);
  const [dropDownState, setDropDownState] = useState("");
  const [dropDownSortState, setDropDownSortState] = useState("");
  const { handleFilterTodos } = useShowCompletedDropdown({ todos, setDropDownState, setShowTodos });
  const { handleSortTodos } = useShowTodosSort({ todos, setDropDownSortState, setTodos });
  const { errors, isLoading, clearErrors, todoNotFound } = useGetTodos({ setTodos });
  const { blockBrowserBack } = useBlockBrowserBack();
  blockBrowserBack();

  useEffect(() => {
    if (todos.length > 0) {
      return clearErrors("todoList");
    }
    todoNotFound();
  }, [todos]);

  useEffect(() => {
    setShowTodos(todos);
    handleFilterTodos(dropDownState);
    handleSortTodos(dropDownSortState);
  }, [todos]);

  return (
    <FormBody title={null}>
      <div className="w-full max-w-xl absolute top-16 flex flex-col items-center" >
        <div className='w-full max-w-xl mt-5 px-5'>
          <div className='w-full px-8 py-6 bg-white shadow-md rounded-lg'>
            <AddTask isLoading={isLoading} todos={todos} setTodos={setTodos} />
            <div className='flex flex-row justify-end'>
              <ShowCompletedDropdown todos={todos} setDropDownState={setDropDownState} setShowTodos={setShowTodos} />
              <ShowTodosSort todos={todos} setDropDownSortState={setDropDownSortState} setTodos={setTodos} />
            </div>
            {!isLoading && errors && <p className=' text-gray-400 flex justify-center'>{errors.todoList?.message}</p>}
            <TodoList todos={todos} showTodos={showTodos} setTodos={setTodos} />
          </div>
        </div>
      </div>
    </FormBody>
  );
};

export default TodoBody;