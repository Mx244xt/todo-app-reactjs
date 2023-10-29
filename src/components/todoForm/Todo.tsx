import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TodoPropsType } from '../../types';
import TodoButton from './Todo/TodoButton';
import TodoCheckbox from './Todo/TodoCheckbox';
import TodoInputFrom from './Todo/TodoInputFrom';
import TodoSrot from './Todo/TodoSrot';
import useCompleted from './hooks/useCompleted';
import useDeleteTodo from './hooks/useDeleteTodo';
import useEditTodo from './hooks/useEditTodo';
import { useState } from 'react';

const Todo = ({ ...props }: TodoPropsType) => {

  const [isShowdrop, setIsShowdrop] = useState(false);
  const editProps = useEditTodo({ ...props });
  const completedProps = useCompleted({ ...props });
  const deleteProps = useDeleteTodo({ ...props });
  const sortProps = useSortable({
    id: props.todo.id
  });

  const transition = sortProps.transition;
  const style = {
    transform: CSS.Transform.toString(sortProps.transform),
    transition,
  };


  return (
    <>
      <form onSubmit={editProps.handleSubmit(editProps.handleSave)} ref={sortProps.setNodeRef} style={style} className='flex flex-col  bg-white border-l-4 border-blue-500 rounded shadow relative'>
        <div className='flex items-center justify-between'>
          <TodoSrot
            id={props.todo.id}
            {...sortProps}
          />
          <TodoCheckbox
            {...completedProps}
          />
          <TodoInputFrom
            {...sortProps}
            {...completedProps}
            {...editProps}
          />
          <TodoButton
            {...editProps}
            {...completedProps}
            {...deleteProps} />
          <button type='button' onClick={() => setIsShowdrop(!isShowdrop)}>
            <img className='h-5 w-5' src='/images/information_icon.svg' alt='↓' />
          </button>
        </div>
        {isShowdrop &&
          <div className='flex  justify-between p-1 pl-2 border-t'>
            <div className=''>
              <p className='mr-2 text-base'>メモ</p>
              {!editProps.isEditing
                ? <p className='break-all text-sm pr-2'>{editProps.todoMemo}</p>
                : <input type="text" name='memo' onChange={(e) => editProps.handleChangeMemo(e)} className='border' value={editProps.todoMemo} />
              }
            </div>
            <div className=''>
              <p className='mr-2'>期日</p>
              {!editProps.isEditing
                ? <p>{editProps.todoDate.getTime() > new Date(0).getTime() ? editProps.todoDate.toLocaleDateString() : null}</p>
                : <input type="date" name="date" onChange={(e) => editProps.handleChangeDate(e)} disabled={!editProps.isEditing} value={editProps.todoDate.toLocaleDateString().replaceAll('/', '-')} />
              }
            </div>
          </div>
        }
      </ form >
      <p className='text-red-400'>{editProps.errors.todo?.message}</p>
      <p className='text-red-400'>{completedProps.errors.todo?.message}</p>
    </>
  );
};

export default Todo;