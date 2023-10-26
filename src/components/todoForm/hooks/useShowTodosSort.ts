import { ShowTodosSortType } from "../ShowTodosSort";

const useShowTodosSort = ({ todos, setDropDownSortState, setTodos }: ShowTodosSortType) => {
  const sortedTodos = [...todos];
  const handleSortTodos = (e: string) => {
    setDropDownSortState(e);
    switch (e) {
      case ("作成日 降順"):
        sortedTodos.sort((a, b) => a.updateAt.seconds - b.updateAt.seconds);
        break;
      case ("作成日 昇順"):
        sortedTodos.sort((a, b) => b.updateAt.seconds - a.updateAt.seconds);
        break;
      case ("タイトル 昇順"):
        sortedTodos.sort((a, b) => b.text.localeCompare(a.text));
        break;
      case ("タイトル 降順"):
        sortedTodos.sort((a, b) => a.text.localeCompare(b.text));
        break;
      default:
        sortedTodos.sort((a, b) => a.index - b.index);
        break;
    }
    setTodos(sortedTodos);
  };
  return { handleSortTodos };
};

export default useShowTodosSort;