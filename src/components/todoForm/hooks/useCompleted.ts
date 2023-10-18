import { useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks } from '../../../hooks';
import { ResponseTodoType, TodoType } from '../../../types';

const useCompleted = ({ todo }: { todo: TodoType }) => {

  const { updateSessionTime } = useCookiesHooks();
  const { checkedTodo } = useFirebaseApi();
  const [isCompleted, setIsCmpleted] = useState(todo.completed);

  const handleCompleted = async () => {
    updateSessionTime();
    try {
      setIsCmpleted(!isCompleted);
      const response: ResponseTodoType = await checkedTodo({ uid: todo.uid, id: todo.id, completed: !isCompleted });
      if (response.statusCode !== 200) {
        setIsCmpleted(isCompleted);
      }
    } catch (error) {
      setIsCmpleted(isCompleted);
    }
  };

  return {
    state: {
      isCompleted,
    },
    action: {
      handleCompleted,
    },
  };
};

export default useCompleted;