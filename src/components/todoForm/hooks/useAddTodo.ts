import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useToast } from '../../../hooks';
import { todoFormType, todoValidationShema } from '../../../lib/validationShema';
import { ResponseTodoType, TodosStateType } from '../../../types';
import useTodos from './useTodos';

const useAddTodo = ({ todos, setTodos }: TodosStateType) => {

  const { onAddTodo, onDeleteTodo } = useTodos({ todos, setTodos });
  const { cookies, logOut, updateSessionTime } = useCookiesHooks();
  const { addTodo } = useFirebaseApi();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    clearErrors,
  } = useForm<todoFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(todoValidationShema),
  });

  const badResponse = () => setError("todo", {
    type: "manual",
    message: "データの作成に失敗しました。",
  });

  const idExpired = () => setError("todo", {
    type: "manual",
    message: "IDの有効期限が切れています。",
  });

  const handleAddTodo: SubmitHandler<todoFormType> = async ({ todo }: { todo: string }) => {
    resetField("todo");
    updateSessionTime();
    if (cookies.uid == null) {
      idExpired();
      setTimeout(() => {
        clearErrors("todo");
        logOut();
      }, 3000);
      return;
    }
    const id = uuidv4();
    const data = {
      id: id,
      index: todos.length,
      text: todo,
      createAt: new Date(),
      updateAt: new Date(),
      completed: false,
      uid: cookies.uid,
    };
    onAddTodo(data);
    const ToastId = toast.loadingToast();
    try {
      const response: ResponseTodoType = await addTodo({ id: id, index: 0, text: todo, uid: cookies.uid });
      if (response.statusCode !== 200) {
        onDeleteTodo(data.id);
        badResponse();
        toast.errorToast(ToastId);
        return;
      }
      toast.successToast(ToastId);
      return;
    } catch (error) {
      onDeleteTodo(data.id);
      badResponse();
      toast.errorToast(ToastId);
    }
  };

  useEffect(() => {
    window.addEventListener('click', () => {
      if (errors.todo) {
        setTimeout(() => {
          clearErrors("todo");
        }, 3000);
        return;
      }
    });
  }, [errors.todo]);

  return { errors, register, handleSubmit, handleAddTodo };
};

export default useAddTodo;