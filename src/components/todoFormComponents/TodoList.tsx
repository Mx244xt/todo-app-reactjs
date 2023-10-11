import { TodoType } from '@/types';
import Todo from './Todo';
import useFirebaseApi from '../../api/useFirebaseApi';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

interface TodoPropsTypes {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  deleteTask: (data: string) => void;
};

const TodoList = ({ todos, setTodos, deleteTask }: TodoPropsTypes) => {
  const { changeIndex } = useFirebaseApi();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const result = arrayMove(items, oldIndex, newIndex);
        changeIndex(result)
        return result
      });
    }
  }
  //

  return (
    <ul className='space-y-3'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((todo: any) => (
            < Todo key={todo.id} todo={todo} deleteTask={deleteTask} />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
};

export default TodoList;