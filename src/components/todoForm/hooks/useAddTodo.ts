import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useToast } from '../../../hooks';
import { todoFormType } from '../../../lib/validationShema';
import { ResponseTodoType, TodosStateType } from '../../../types';
import useTodos from './useTodos';
import useTodoValidation from './useTodoValidation';

const useAddTodo = ({ todos, setTodos }: TodosStateType) => {

  const { onAddTodo, onDeleteTodo } = useTodos({ todos, setTodos });
  const { addTodo } = useFirebaseApi();
  const toast = useToast();
  const validation = useTodoValidation();
  const { cookies, errors, register, handleSubmit } = validation;

  const handleAddTodo: SubmitHandler<todoFormType> = async ({ todo }: { todo: string }) => {
    validation.sessionCheck();
    if (cookies.uid == null) {
      validation.idHasExpired();
      return;
    }
    validation.resetField("todo");
    const id = uuidv4();
    const data = {
      id: id,
      index: todos.length,
      text: todo,
      createAt: {
        seconds: new Date().getSeconds(),
        nanoseconds: new Date().getMilliseconds(),
      },
      updateAt: {
        seconds: new Date().getSeconds(),
        nanoseconds: new Date().getMilliseconds(),
      },
      completed: false,
      uid: cookies.uid,
    };
    onAddTodo(data);
    const ToastId = toast.loadingToast();
    try {
      const response: ResponseTodoType = await addTodo({ id: id, index: 0, text: todo, uid: cookies.uid });
      if (response.statusCode !== 200) {
        onDeleteTodo(data.id);
        validation.badResponse();
        toast.errorToast(ToastId);
        return;
      }
      toast.successToast(ToastId);
      return;
    } catch (error) {
      onDeleteTodo(data.id);
      validation.badResponse();
      toast.errorToast(ToastId);
    }
  };

  useEffect(() => {
    window.addEventListener('click', () => {
      if (errors.todo) {
        setTimeout(() => {
          validation.clearErrors("todo");
        }, 3000);
        return;
      }
    });
  }, [errors.todo]);

  return { errors, register, handleSubmit, handleAddTodo };
};

export default useAddTodo;