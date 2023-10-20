import useSort from './hooks/useSort';
import { TodoType, TodosStateType } from '@/types';
import Todo from './Todo';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Loading } from '../uiComponents';
import useTodos from './hooks/useTodos';

const TodoList = ({ todos, setTodos }: TodosStateType) => {

  const { sensors, handleDragEnd } = useSort({ todos, setTodos });
  const { isLoading, onAddTodo, onDeleteTodo } = useTodos({ todos, setTodos });

  return (
    isLoading
      ? <Loading />
      : <ul className='space-y-3' >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={todos}
            strategy={verticalListSortingStrategy}
          >
            {todos.map((todo: TodoType) => (
              < Todo key={todo.id} todo={todo} onAddTodo={onAddTodo} onDeleteTodo={onDeleteTodo} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
  );
};

export default TodoList;