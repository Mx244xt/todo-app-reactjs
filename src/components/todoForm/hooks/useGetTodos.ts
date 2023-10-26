
import { ResponseTodoType, TodoType } from '@/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { todoListType } from '../../../lib/validationShema';

export interface initialTodosStateType {
  setOriginTodo: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const useGetTodos = ({ setTodos }: { setTodos: React.Dispatch<React.SetStateAction<TodoType[]>> }) => {
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { cookies, elapsedTime } = useCookiesHooks();
  const { getTodoList } = useFirebaseApi();
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useForm<todoListType>({
  });

  const todoNotFound = () => setError("todoList", {
    type: "manual",
    message: "登録されているタスクはありません。",
  });

  const getError = () => setError("todoList", {
    type: "manual",
    message: "データが取得できませんでした。",
  });

  useEffect(() => {
    startLoding();
    const fetchData = async () => {
      try {
        if (cookies.uid == null) return;
        elapsedTime();
        const response: ResponseTodoType = await getTodoList(cookies.uid);
        if (response.statusCode !== 200) {
          getError();
          return;
        }
        const todoList = JSON.parse(response.todoList);
        if (todoList.length <= 0) return;
        const sortList = todoList.sort((a: TodoType, b: TodoType) => a.index - b.index);
        setTodos(sortList);
        return;
      } catch (error) {
        getError();
      } finally {
        stopLoding();
      }
    };
    fetchData();
  }, []);

  return {
    errors,
    isLoading,
    clearErrors,
    todoNotFound
  };
};

export default useGetTodos;