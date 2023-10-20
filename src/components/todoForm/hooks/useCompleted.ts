import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useToast } from '../../../hooks';
import { ResponseTodoType, TodoType } from '../../../types';


const useCompleted = ({ todo }: { todo: TodoType }) => {

  const { updateSessionTime } = useCookiesHooks();
  const { checkedTodo } = useFirebaseApi();
  const [isCompleted, setIsCmpleted] = useState(todo.completed);
  const toast = useToast();

  const handleCompleted = async () => {
    updateSessionTime();
    setIsCmpleted(!isCompleted);
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

  return { isCompleted, handleCompleted, };
};

export default useCompleted;