import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useToast } from '../../../hooks';
import { ResponseTodoType, TodoPropsType } from '../../../types';

const useDeleteTodo = ({ todo, onAddTodo, onDeleteTodo }: TodoPropsType) => {

  const { updateSessionTime } = useCookiesHooks();
  const { deleteTodo } = useFirebaseApi();
  const [stockTask, setStockTask] = useState(todo);
  const toast = useToast();


  const handleDelete = async () => {
    updateSessionTime();
    setStockTask(todo);
    onDeleteTodo(todo.id);
    const id = toast.loadingToast();
    const response: ResponseTodoType = await deleteTodo({ uid: todo.uid, id: todo.id });
    if (response.statusCode === 200) {
      return toast.successToast(id);
    }
    if (response.statusCode === 204) {
      return toast.successToast(id);
    }
    onAddTodo(stockTask);
    toast.errorToast(id);
    return;
  };

  return { handleDelete };
};

export default useDeleteTodo;