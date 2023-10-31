import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useToast } from '../../../hooks';
import { ResponseTodoType, TodoPropsType } from '../../../types';
import useTodoValidation from './useTodoValidation';

const useDeleteTodo = ({ todo, onAddTodo, onDeleteTodo }: TodoPropsType) => {

  const { deleteTodo } = useFirebaseApi();
  const [stockTask, setStockTask] = useState(todo);
  const toast = useToast();
  const validation = useTodoValidation();
  const { cookies } = validation;

  const handleDelete = async () => {
    if (cookies.uid == null) {
      return;
    }
    validation.sessionCheck();
    setStockTask(todo);
    onDeleteTodo(todo.id);
    const id = toast.loadingToast();
    try {
      const response: ResponseTodoType = await deleteTodo({ uid: todo.uid, id: todo.id });
      if (response.statusCode === 200) {
        return toast.successUpdateToast(id, 'データを更新しました。');
      }
      if (response.statusCode === 204) {
        return toast.successUpdateToast(id, 'データを更新しました。');
      }
      onAddTodo(stockTask);
      toast.errorUpdateToast(id, 'データの更新に失敗しました。');
      return;
    } catch (error) {
      onAddTodo(stockTask);
      toast.errorUpdateToast(id, 'データの更新に失敗しました。');
    }
  };

  return { handleDelete };
};

export default useDeleteTodo;