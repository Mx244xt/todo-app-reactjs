import { TodoType } from "@/types";
import useShowCompletedDropdown from "./hooks/useShowCompletedDropdown";

export interface ShowTodoStateType {
  todos: TodoType[];
  setShowTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  setDropDownState: React.Dispatch<React.SetStateAction<string>>
}

const ShowCompletedDropdown = (props: ShowTodoStateType) => {

  const { handleFilterTodos } = useShowCompletedDropdown(props);

  return (
    <div className="mr-3">
      <select onChange={(e) => handleFilterTodos(e.target.value)} className="border mb-2">
        <option >全て</option>
        <option >未完了</option>
        <option >完了済み</option>
      </select>
    </div>
  );
};

export default ShowCompletedDropdown;