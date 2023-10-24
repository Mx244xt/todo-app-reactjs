
import { ResponseTodoType, TodoType, TodosStateType } from '@/types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { todoListType } from '../../../lib/validationShema';

const useTodos = ({ todos, setTodos }: TodosStateType) => {
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

  const onAddTodo = (newTodo: TodoType) => {
    setTodos((todos) => [newTodo, ...todos]);
    clearErrors("todoList");
  };

  const onDeleteTodo = (id: string) => {
    const updataTodos: TodoType[] = todos.filter((todo) => (
      todo.id !== id && todo
    ));
    setTodos(updataTodos);
  };

  return {
    todos,
    errors,
    isLoading,
    onAddTodo,
    onDeleteTodo,
    setTodos,
    clearErrors,
    todoNotFound
  };
};

export default useTodos;