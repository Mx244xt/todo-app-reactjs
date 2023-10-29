import { TodoType } from "@/types";
import useShowTodosSort from "./hooks/useShowTodosSort";

export interface ShowTodosSortType {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const ShowTodosSort = (props: ShowTodosSortType) => {
  const { handleSortTodos } = useShowTodosSort(props);
  return (
    <div>
      <select onChange={(e) => handleSortTodos(e.target.value)} className="border mb-2">
        <option >手動</option>
        <option >作成日 昇順</option>
        <option >作成日 降順</option>
        <option >タイトル 昇順</option>
        <option >タイトル 降順</option>
      </select>
    </div>);
};

export default ShowTodosSort;