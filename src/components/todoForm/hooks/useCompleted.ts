import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useToast } from '../../../hooks';
import { ResponseTodoType, TodoType } from '../../../types';
import useTodoValidation from './useTodoValidation';


const useCompleted = ({ todo, onCompletedTodo }: { todo: TodoType, onCompletedTodo: (id: string, completed: boolean) => void }) => {

  const { checkedTodo } = useFirebaseApi();
  const [isCompleted, setIsCmpleted] = useState(todo.completed);
  const toast = useToast();
  const validation = useTodoValidation();
  const { cookies, errors } = validation;

  const handleCompleted = async () => {
    validation.sessionCheck();
    if (cookies.uid == null) {
      validation.idHasExpired();
      return;
    }
    setIsCmpleted(!isCompleted);
    onCompletedTodo(todo.id, !isCompleted);
    const id = toast.loadingToast();
    try {
      const response: ResponseTodoType = await checkedTodo({ uid: todo.uid, id: todo.id, completed: !isCompleted });
      if (response.statusCode !== 200) {
        setIsCmpleted(isCompleted);
        toast.errorToast(id);
        return;
      }
      toast.successToast(id);
      return;
    } catch (error) {
      setIsCmpleted(isCompleted);
      toast.errorToast(id);
    }
  };

  return { isCompleted, handleCompleted, errors };
};

export default useCompleted;