
import { ResponseTodoType, TodoType } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { todoListType } from '../../../lib/validationShema';

const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { cookies, elapsedTime, logOut } = useCookiesHooks();
  const { getTodoList } = useFirebaseApi();
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useForm<todoListType>({
  });

  const noTodo = () => setError("todoList", {
    type: "manual",
    message: "登録されているタスクはありません。",
  });

  useEffect(() => {
    startLoding();
    const fetchData = async () => {
      try {
        if (cookies.uid == null) {
          return logOut();
        }
        elapsedTime();
        const response: ResponseTodoType = await getTodoList(cookies.uid);
        if (response.statusCode === 200) {
          const todoList = JSON.parse(response.todoList);
          if (todoList.length <= 0) {
            noTodo();
          }
          const sortList = todoList.sort((a: TodoType, b: TodoType) => a.index - b.index);
          setTodos(sortList);
        } else {
          setError("todoList", {
            type: "manual",
            message: "データが取得できませんでした。",
          });
        }
      } catch (error) {
        stopLoding();
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
    if (updataTodos.length <= 0) {
      noTodo();
    }
  };

  return {
    state: {
      todos,
      errors,
      isLoading,
    },
    action: {
      onAddTodo,
      onDeleteTodo,
      setTodos
    }
  };
};

export default useTodos;