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
    state: { isEditing, editedTaskText, inputRef, setEditedTaskText },
    action: { handleEdit, handleKeyDown, handleSave, handleReset },
    validation: { errors, register, handleSubmit }
  } = useEditTodo({ todo });

  const { state: { isCompleted }, action: { handleCompleted } } = useCompleted({ todo });

  const { action: { handleDelete } } = useDeleteTodo({ todo, onAddTodo, onDeleteTodo });

  return (
    <>
      <form onSubmit={handleSubmit(handleSave)} ref={setNodeRef} style={style} className='flex items-center justify-between  bg-white border-l-4 border-blue-500 rounded shadow relative'>
        <TodoSrot
          attributes={attributes}
          listeners={listeners}
          transform={transform}
          transition={transition}
        />
        <TodoCheckbox
          isCompleted={isCompleted}
          handleCompleted={handleCompleted}
        />
        <TodoInputFrom
          isEditing={isEditing}
          isCompleted={isCompleted}
          editedTaskText={editedTaskText}
          inputRef={inputRef}
          register={register}
          handleKeyDown={handleKeyDown}
          setEditedTaskText={setEditedTaskText}
        />
        <TodoButton
          isEditing={isEditing}
          handleSave={handleSave}
          handleSubmit={handleSubmit}
          handleEdit={handleEdit}
          handleReset={handleReset}
          handleDelete={handleDelete}
        />
      </ form>
      <p className='text-red-400'>{errors.todo?.message}</p>
    </>
  );
};

export default Todo;