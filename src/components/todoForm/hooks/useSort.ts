import {
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import useFirebaseApi from '../../../api/useFirebaseApi';
import { TodosStateType } from '@/types';

const useSort = ({ todos, setTodos }: TodosStateType) => {

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
        changeIndex(result);
        return result;
      });
    }
  };

  return {
    state: { todos, sensors },
    action: { handleDragEnd }
  };
};

export default useSort;