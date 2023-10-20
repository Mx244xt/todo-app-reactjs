import { ResponseTodoType, TodosStateType } from '@/types';
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
import { useToast } from '../../../hooks';

const useSort = ({ todos, setTodos }: TodosStateType) => {

  const { changeIndex } = useFirebaseApi();
  const toast = useToast();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    const sortResult = () => {
      const oldIndex = todos.findIndex((item) => item.id === active.id);
      const newIndex = todos.findIndex((item) => item.id === over.id);
      const result = arrayMove(todos, oldIndex, newIndex);
      return result;
    };
    const result = sortResult();
    setTodos(result);
    const id = toast.loadingToast();
    try {
      const response: ResponseTodoType = await changeIndex(result);
      if (response.statusCode !== 200) {
        toast.errorToast(id);
        return;
      }
      toast.successToast(id);
    } catch (error) {
      toast.errorToast(id);
    }
  };

  return { todos, sensors, handleDragEnd };
};

export default useSort;