import useSort from './hooks/useSort';
import { TodoType, TodosStateType } from '@/types';
import Todo from './Todo';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Loading } from '../uiComponents';
import useTodos from './hooks/useTodos';
import useGetTodos from './hooks/useGetTodos';

const TodoList = ({ todos, showTodos, setTodos }: TodosStateType & { showTodos: TodoType[] }) => {

  const { sensors, handleDragEnd } = useSort({ todos, setTodos });
  const { ...props } = useTodos({ todos, setTodos });
  const { isLoading } = useGetTodos({ setTodos });

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
            items={showTodos}
            strategy={verticalListSortingStrategy}
          >
            {showTodos.map((todo: TodoType) => (
              < Todo key={todo.id} todo={todo} {...props} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
  );
};

export default TodoList;