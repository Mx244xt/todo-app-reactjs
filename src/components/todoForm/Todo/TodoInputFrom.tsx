import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { UseFormRegister } from "react-hook-form";

interface TodoInputFromType {
  isEditing: boolean;
  isCompleted: boolean;
  editedTaskText: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  register: UseFormRegister<{ todo: string; }>;
  setEditedTaskText: React.Dispatch<React.SetStateAction<string>>;
  listeners: SyntheticListenerMap | undefined;
}
const TodoInputFrom = ({ isEditing, editedTaskText, isCompleted, inputRef, listeners, register, setEditedTaskText }: TodoInputFromType) => {
  const { ref, onChange, ...regist } = register('todo');

  return (
    <>
      {isEditing ? (
        <div className='flex items-center pr-2  w-80' >
          <input
            {...regist}
            ref={(e) => {
              inputRef.current = e;
              ref(e);
            }}
            type='text'
            className='mr-2 py-1 px-2 w-full rounded border-gray-400 border'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEditedTaskText(e.target.value);
              onChange(e);
            }}
            value={editedTaskText}
            placeholder='タスクを入力する。'
          />
        </div>
      ) : (
        <div className='flex items-center pr-2 h-14 w-80 cursor-pointer' {...listeners} >
          {isCompleted ? (
            <span className='text-gray-400 line-through flex items-center break-all' >{editedTaskText}</span>
          ) : (
            <span className='text-black flex items-center break-all' >{editedTaskText}</span>
          )}
        </div>
      )
      }
    </>
  );
};

export default TodoInputFrom;