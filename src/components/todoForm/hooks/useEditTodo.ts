import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks } from '../../../hooks';
import { todoFormType, todoValidationShema } from '../../../lib/validationShema';
import { ResponseTodoType, TodoType } from '../../../types';

const useEditTodo = ({ todo }: { todo: TodoType }) => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { updateSessionTime } = useCookiesHooks();
  const { editTodo } = useFirebaseApi();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(todo.text);
  const [stockTaskText, setStockTaskText] = useState(todo.text);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<todoFormType>({
    mode: 'onChange',
    resolver: zodResolver(todoValidationShema)
  });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setStockTaskText(editedTaskText);
    setIsEditing(true);
  };

  const handleSave = async () => {
    updateSessionTime();
    setIsEditing(false);
    try {
      const response: ResponseTodoType = await editTodo({ uid: todo.uid, id: todo.id, newText: editedTaskText });
      if (response.statusCode !== 200) {
        setEditedTaskText(todo.text);
      }
    } catch (error) {
      setEditedTaskText(todo.text);
    }
  };

  const handleReset = () => {
    setEditedTaskText(stockTaskText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    // handleSubmit(handleSave)();
  };

  return {
    state: {
      isEditing,
      inputRef,
      editedTaskText,
      setIsEditing,
      setEditedTaskText,
    },
    action: {
      handleEdit,
      handleSave,
      handleReset,
      handleKeyDown
    },
    validation: {
      errors,
      register,
      handleSubmit
    }
  };
};

export default useEditTodo;