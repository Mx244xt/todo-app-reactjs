import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TodoType } from '../../types';
import { Loading } from '../uiComponents';
import useTodo from './hooks/useTodo';

interface TodoPropsType {
  todo: TodoType;
}

const Todo = ({ todo }: TodoPropsType) => {
  const {
    attributes, listeners, setNodeRef, transform, transition
  } = useSortable({
      id: todo.id
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const {
    state: {
      isLoading,
      isEditing,
      isCompleted,
      editedTaskText,
      errors,
      inputRef,
      setEditedTaskText,
      register
    },
    action: {
      handleEdit,
      handleKeyDown,
      handleSave,
      handleCompleted,
      handleReset,
      handleDelete
    }
  } = useTodo({ todo });

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