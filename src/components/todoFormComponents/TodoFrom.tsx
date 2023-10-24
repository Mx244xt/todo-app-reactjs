
import { ResponseTodoType, TodoType } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddTask, TodoList } from '.';
import useFirebaseApi from '../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../hooks';
import { todoListType } from '../../lib/validationShema';
import FormBody from '../baseComponents/FormBody';
import { Loading, Title } from '../uiComponents';


const TodoFrom = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { cookies, elapsedTime } = useCookiesHooks();
  const { getTodoList } = useFirebaseApi();
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useForm<todoListType>({
  });

  useEffect(() => {
    elapsedTime();
  }, []);

  const blockBrowserBack = useCallback(() => {
    window.history.go(1);
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', blockBrowserBack);
    return () => {
      window.removeEventListener('popstate', blockBrowserBack);
    };
  }, [blockBrowserBack]);

  const noTodo = () => setError("todoList", {
    type: "manual",
    message: "登録されているタスクはありません。",
  });

  useEffect(() => {
    startLoding();
    const fetchData = async () => {
      try {
        if (cookies.uid !== undefined) {
          const response: ResponseTodoType = await getTodoList(cookies.uid);
          if (response.statusCode === 200) {
            const todoList = JSON.parse(response.todoList);
            if (todoList.length <= 0) {
              noTodo();
            }
            const sortList = todoList.sort((a: any, b: any) => b.updateAt.seconds - a.updateAt.seconds);
            setTodos(sortList);
          } else {
            setError("todoList",{
              type: "manual",
              message: "データが取得できませんでした。",
            })
          }
        };
      } catch (error) {
        stopLoding();
        console.error('500', error);
      } finally {
        stopLoding();
      };
    };
    fetchData();
  }, [cookies.uid]);

  const addTodo = (newTodo: TodoType) => {
    setTodos((todos) => [newTodo, ...todos]);
    clearErrors("todoList");
  };

  const deleteTask = (id: string) => {
    const updataTodos: TodoType[] = todos.filter((todo) => (
      todo.id !== id && todo
    ));
    setTodos(updataTodos);
    if (updataTodos.length <= 0) {
      noTodo();
    };
  };

  return (
    <FormBody>
      <div className="w-full max-w-xl absolute top-16 flex flex-col items-center" >
        <Title title="Nextjs 13 Todo App" />
        <div className='w-full max-w-xl mt-5 px-5'>
          <div className='w-full px-8 py-6 bg-white shadow-md rounded-lg'>
            <AddTask onAddTodo={addTodo} />
            {isLoading
              ? <Loading />
              : <TodoList todos={todos} deleteTask={deleteTask} />}
            {errors && <p className=' text-gray-400 flex justify-center'>{errors.todoList?.message}</p>}
          </div>
        </div>
      </div>
    </FormBody>
  );
};

export default TodoFrom;