import { useEffect } from "react";
import { ShowTodosSortType } from "../ShowTodosSort";

const useShowTodosSort = ({ todos, setDropDownSortState, setTodos }: ShowTodosSortType) => {
  const sortedTodos = [...todos];
  
  useEffect(()=>{
    setDropDownSortState('手動');
  },[]);
  
  const handleSortTodos = (e: string) => {
    setDropDownSortState(e);
    switch (e) {
      case ("手動"):
        sortedTodos.sort((a, b) => a.index - b.index);
        break;
      case ("作成日 降順"):
        sortedTodos.sort((a, b) => new Date(b.updateAt).getSeconds() - new Date(a.updateAt).getSeconds());
        break;
      case ("作成日 昇順"):
        sortedTodos.sort((a, b) => new Date(a.updateAt).getSeconds() - new Date(b.updateAt).getSeconds());
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