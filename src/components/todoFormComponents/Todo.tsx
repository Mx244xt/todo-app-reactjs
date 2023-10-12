import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseApi from '../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../hooks';
import { todoFormType, todoValidationShema } from '../../lib/validationShema';
import { ResponseTodoType, TodoType } from '../../types';
import { Loading } from '../uiComponents';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoPropsType {
  todo: TodoType;
  deleteTask: (data: string) => void;
}

const Todo = ({ todo, deleteTask }: TodoPropsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: todo.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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

  const updateError = () => {
    setError("todo", {
      type: "manual",
      message: "データが更新できませんでした。",
    });
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

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
        console.error(response.statusCode, response.message);
        updateError();
        setIsCmpleted(isCompleted);
      }
    } catch (error) {
      console.error("500: ", error);
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
          console.error(response.statusCode, response.message);
          updateError();
          setEditedTaskText(todo.text);
        }
      } catch (error) {
        console.error("500: ", error);
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
    const response: ResponseTodoType = await deleteTodo({ uid: todo.uid, id: todo.id });
    if (response.statusCode === 200) {
      deleteTask(todo.id);
    } else {
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

  return (
    <>
      <div ref={setNodeRef} style={style} >
        <li
          className='flex items-center justify-between pl-2 pr-4 py-4 bg-white border-l-4 border-blue-500 rounded shadow relative'>
          <picture className='flex justify-center items-center w-3 h-3' {...attributes} {...listeners}>
            {transform && transition ? <img src="/images/sort_icon_disable.png" alt="" />
              : <img src="/images/sort_icon_active.png" alt="" />}
          </picture>
          <div className='flex items-center pr-2  w-80'>
            <div>
              <input type="checkbox" className='mr-3 w-5 cursor-pointer' onChange={handleCompleted} checked={isCompleted} />
            </div>
            {isLoading ? <Loading /> :
              isEditing ? (
                <input
                  ref={inputRef}
                  type='text'
                  className='mr-2 py-1 px-2 w-full rounded border-gray-400 border'
                  {...register}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedTaskText(e.target.value)}
                  value={editedTaskText}
                  onKeyDown={handleKeyDown}
                  placeholder='変更するタスクを入力してください。'
                />
              ) : (
                isCompleted ? (
                  <span className='text-gray-400 line-through flex items-center break-all'>{editedTaskText}</span>
                ) : (
                  <span className='text-black flex items-center break-all'>{editedTaskText}</span>
                )
              )
            }
          </div>
          <div className='flex flex-col items-end w-24 sm:flex-row sm:items-center'>
            {isEditing ? (
              <button className='text-green-500 mr-3' onClick={handleSave}>保存</button>
            ) : (
              <button className='text-green-500 mr-3' onClick={handleEdit}>編集</button>
            )}
            {isEditing ? (
              <button className='text-red-500 mr-3' onClick={handleReset}>戻る</button>
            ) : (
              <button className='text-red-500 mr-3' onClick={handleDelete}>削除</button>
            )}

          </div>
        </li >
      </div>
      <p className='text-red-400'>{errors.todo?.message}</p>
    </>
  );
};

export default Todo;