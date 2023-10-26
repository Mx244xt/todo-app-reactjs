import { ShowTodosSortType } from "../ShowTodosSort";

const useShowTodosSort = ({ todos, setTodos }: ShowTodosSortType) => {
  const sortedTodos = [...todos];
  const handleSortTodos = (e: string) => {
    switch (e) {
      case ("手動 降順"):
        sortedTodos.sort((a, b) => b.index - a.index);
        break;
      case ("手動 昇順"):
        sortedTodos.sort((a, b) => a.index - b.index);
        break;
      case ("作成日 降順"):
        sortedTodos.sort((a, b) => b.updateAt.seconds - a.updateAt.seconds);
        break;
      case ("作成日 昇順"):
        sortedTodos.sort((a, b) => a.updateAt.seconds - b.updateAt.seconds);
        break;
      default:
        break;
    }
    setTodos(sortedTodos);
  };
  return { handleSortTodos };
};

export default useShowTodosSort;