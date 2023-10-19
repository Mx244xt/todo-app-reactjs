import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks } from '../../../hooks';
import { ResponseTodoType, TodoPropsType } from '../../../types';
import useTodoToast from './useTodoToast';

const useDeleteTodo = ({ todo, onAddTodo, onDeleteTodo }: TodoPropsType) => {

  const { updateSessionTime } = useCookiesHooks();
  const { deleteTodo } = useFirebaseApi();
  const [stockTask, setStockTask] = useState(todo);
  const toast = useTodoToast();


  const handleDelete = async () => {
    updateSessionTime();
    setStockTask(todo);
    onDeleteTodo(todo.id);
    const id = toast.loadingToast();
    const response: ResponseTodoType = await deleteTodo({ uid: todo.uid, id: todo.id });
    if (response.statusCode !== 200) {
      onAddTodo(stockTask);
      toast.errorToast(id);
      return;
    }
    toast.successToast(id);
  };

  return {
    action: {
      handleDelete
    }
  };
};

export default useDeleteTodo;