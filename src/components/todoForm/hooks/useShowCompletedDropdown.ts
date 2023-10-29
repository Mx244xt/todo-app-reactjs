import { TodoType } from "@/types";
import { ShowTodoStateType } from "../ShowCompletedDropdown";

const useShowCompletedDropdown = ({ todos, setDropDownState, setShowTodos }: ShowTodoStateType) => {

  const handleFilterTodos = (e: string) => {
    setShowTodos(todos);
    setDropDownState(e);
    switch (e) {
      case ("完了済み"):
        handleCompleted();
        break;
      case ("未完了"):
        handleIncomplete();
        break;
      default:
        setShowTodos(todos);
        break;
    }
  };

  const handleIncomplete = () => {
    const todofilter: TodoType[] = todos.filter((todo) => (
      todo.completed == false
    ));
    setShowTodos(todofilter);
  };

  const handleCompleted = () => {
    const todofilter: TodoType[] = todos.filter((todo) => (
      todo.completed == true
    ));
    setShowTodos(todofilter);
  };
  return { handleFilterTodos };
};

export default useShowCompletedDropdown;