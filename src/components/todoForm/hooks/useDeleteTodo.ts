import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks } from '../../../hooks';
import { ResponseTodoType, TodoPropsType } from '../../../types';

const useDeleteTodo = ({ todo, onAddTodo, onDeleteTodo }: TodoPropsType) => {

  const { updateSessionTime } = useCookiesHooks();
  const { deleteTodo } = useFirebaseApi();
  const [stockTask, setStockTask] = useState(todo);

  const handleDelete = async () => {
    updateSessionTime();
    setStockTask(todo);
    onDeleteTodo(todo.id);
    const response: ResponseTodoType = await deleteTodo({ uid: todo.uid, id: todo.id });
    if (response.statusCode !== 200) {
      onAddTodo(stockTask);
    }
  };

  return {
    action: {
      handleDelete
    }
  };
};

export default useDeleteTodo;