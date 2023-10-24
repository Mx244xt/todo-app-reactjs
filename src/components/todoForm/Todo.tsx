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

const Todo = ({ todo, onAddTodo, onDeleteTodo }: TodoPropsType) => {

  const sortProps = useSortable({
    id: todo.id
  });
  
  const transition = sortProps.transition;

  const style = {
    transform: CSS.Transform.toString(sortProps.transform),
    transition,
  };

  const editProps = useEditTodo({ todo });
  const completedProps = useCompleted({ todo });
  const deleteProps = useDeleteTodo({ todo, onAddTodo, onDeleteTodo });

  return (
    <>
      <form onSubmit={editProps.handleSubmit(editProps.handleSave)} ref={sortProps.setNodeRef} style={style} className='flex items-center justify-between  bg-white border-l-4 border-blue-500 rounded shadow relative touch-none'>
        <TodoSrot
          id={todo.id}
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
          {...deleteProps} />
      </ form>
      <p className='text-red-400'>{editProps.errors.todo?.message}</p>
    </>
  );
};

export default Todo;