import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Transform } from "@dnd-kit/utilities/dist/css";

interface TodoSrotType {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  transform: Transform | null;
  transition: string | undefined;
}

const TodoSrot = ({ attributes, listeners, transform, transition }: TodoSrotType) => {

  return (
    <div className="flex justify-center items-center h-14 cursor-pointer"{...listeners}>
      <picture className='flex justify-center items-center w-3 h-3 mx-2' {...attributes} >
        {transform && transition ? <img src="/images/sort_icon_disable.png" alt="" />
          : <img src="/images/sort_icon_active.png" alt="" />}
      </picture>
    </div>
  );
};

export default TodoSrot;