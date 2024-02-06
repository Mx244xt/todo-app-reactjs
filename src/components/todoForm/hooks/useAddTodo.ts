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
      createAt: new Date(),
      updateAt: new Date(),
      completed: false,
      uid: cookies.uid,
      memo: "",
      deadLine: new Date(0),
    };
    onAddTodo(data);
    const ToastId = toast.loadingToast();
    try {
      const response: ResponseTodoType = await addTodo({ id: id, index: data.index, text: todo, uid: cookies.uid });
      if (response.statusCode !== 200) {
        onDeleteTodo(data.id);
        validation.badResponse();
        toast.errorUpdateToast(ToastId, 'データの更新に失敗しました。');
        return;
      }
      toast.successUpdateToast(ToastId, 'データを更新しました。');
      return;
    } catch (error) {
      onDeleteTodo(data.id);
      validation.badResponse();
      toast.errorUpdateToast(ToastId, 'データの更新に失敗しました。');
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