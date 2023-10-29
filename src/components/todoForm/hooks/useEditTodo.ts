import { useEffect, useRef, useState } from 'react';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { useToast } from '../../../hooks';
import { ResponseTodoType, TodoType } from '../../../types';
import useTodoValidation from './useTodoValidation';

const useEditTodo = ({ todo, onEditTodo }: { todo: TodoType, onEditTodo: (id: string, text: string) => void }) => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { editTodo } = useFirebaseApi();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(todo.text);
  const [stockTaskText, setStockTaskText] = useState(todo.text);
  const toast = useToast();
  const validation = useTodoValidation();
  const { cookies, errors, register, handleSubmit } = validation;
  const [todoMemo, setTodoMemo] = useState(todo.memo);
  const [todoDate, setTodoDate] = useState(new Date(todo.deadLine));

  const handleChangeMemo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoMemo(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoDate(new Date(e.target.value));
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      return;
    }
  }, [isEditing]);

  const handleEdit = () => {
    setStockTaskText(editedTaskText);
    setIsEditing(true);
  };

  const handleSave = async () => {
    validation.sessionCheck();
    if (cookies.uid == null) {
      validation.idHasExpired();
      return;
    }
    setIsEditing(false);
    onEditTodo(todo.id, todo.text);
    const id = toast.loadingToast();
    try {
      const response: ResponseTodoType = await editTodo({ uid: todo.uid, id: todo.id, newText: editedTaskText, memo: todoMemo, deadLine: todoDate });
      if (response.statusCode !== 200) {
        setEditedTaskText(todo.text);
        toast.errorToast(id);
        return;
      }
      toast.successToast(id);
      return;
    } catch (error) {
      setEditedTaskText(todo.text);
      toast.errorToast(id);
    }
  };

  const handleReset = () => {
    setEditedTaskText(stockTaskText);
    setIsEditing(false);
  };

  return {
    isEditing,
    inputRef,
    editedTaskText,
    todoMemo,
    todoDate,
    setIsEditing,
    setEditedTaskText,
    setTodoMemo,
    setTodoDate,
    handleEdit,
    handleSave,
    handleReset,
    handleChangeMemo,
    handleChangeDate,
    errors,
    register,
    handleSubmit
  };
};

export default useEditTodo;