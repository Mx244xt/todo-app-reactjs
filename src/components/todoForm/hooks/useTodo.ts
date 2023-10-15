import useTodos from './useTodos';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../../hooks';
import { todoFormType, todoValidationShema } from '../../../lib/validationShema';
import { ResponseTodoType, TodoType } from '../../../types';

interface TodoPropsType {
  todo: TodoType;
}

const useTodo = ({ todo }: TodoPropsType) => {

  const { action: { onDeleteTodo } } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { updateSessionTime } = useCookiesHooks();
  const { checkedTodo, deleteTodo, editTodo } = useFirebaseApi();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(todo.text);
  const [stockTaskText, setStockTaskText] = useState(todo.text);
  const [isCompleted, setIsCmpleted] = useState(todo.completed);
  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<todoFormType>({
    mode: 'onChange',
    resolver: zodResolver(todoValidationShema),
    defaultValues: { todo: editedTaskText }
  });

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const updateError = () => {
    setError("todo", {
      type: "manual",
      message: "データが更新できませんでした。",
    });
  };

  const handleEdit = () => {
    setStockTaskText(editedTaskText);
    setIsEditing(true);
  };

  const handleCompleted = async () => {
    updateSessionTime();
    try {
      setIsCmpleted(!isCompleted);
      const response: ResponseTodoType = await checkedTodo({ uid: todo.uid, id: todo.id, completed: !isCompleted });
      if (response.statusCode !== 200) {
        updateError();
        setIsCmpleted(isCompleted);
      }
    } catch (error) {
      setIsCmpleted(isCompleted);
    }
  };

  const handleSave = async () => {
    updateSessionTime();
    if (editedTaskText !== "") {
      clearErrors("todo");
      setIsEditing(false);
      try {
        const response: ResponseTodoType = await editTodo({ uid: todo.uid, id: todo.id, newText: editedTaskText });
        if (response.statusCode !== 200) {
          updateError();
          setEditedTaskText(todo.text);
        }
      } catch (error) {
        setEditedTaskText(todo.text);
      }
    } else {
      setError("todo", {
        type: "manual",
        message: "１文字以上入力してください。",
      });
    }
  };

  const handleDelete = async () => {
    updateSessionTime();
    startLoding();
    onDeleteTodo(todo.id);
    const response: ResponseTodoType = await deleteTodo({ uid: todo.uid, id: todo.id });
    if (response.statusCode !== 200) {
      updateError();
    }
    stopLoding();
  };

  const handleReset = () => {
    setEditedTaskText(stockTaskText);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    handleSave();
  };

  return {
    state: {
      isLoading,
      errors,
      isCompleted,
      isEditing,
      inputRef,
      editedTaskText,
      setEditedTaskText,
      register
    },
    action: {
      handleEdit,
      handleSave,
      handleCompleted,
      handleDelete,
      handleReset,
      handleKeyDown
    }
  };
};

export default useTodo;