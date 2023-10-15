import useSort from './hooks/useSort';
import { TodoType } from '@/types';
import Todo from './Todo';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Loading } from '../uiComponents';

const TodoList = () => {
  const {
    state: { todos, isLoading, sensors },
    action: { handleDragEnd }
  } = useSort();

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
              < Todo key={todo.id} todo={todo} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
  );
};

export default TodoList;