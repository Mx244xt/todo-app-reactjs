import { TodoType } from "@/types";
import { useEffect } from "react";

interface ShowTodoStateType {
  todos: TodoType[];
  setShowTodo: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const ShowCompletedDropdown = ({ todos, setShowTodo }: ShowTodoStateType) => {

  useEffect(() => {
    setShowTodo(todos);
  }, [todos]);

  const handleFilterTodos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case ("完了済み"):
        handleCompleted();
        break;
      case ("未完了"):
        handleIncomplete();
        break;
      default:
        setShowTodo(todos);
        break;
    }
  };

  const handleIncomplete = () => {
    const todofilter: TodoType[] = todos.filter((todo) => (
      todo.completed == false
    ));
    setShowTodo(todofilter);
  };

  const handleCompleted = () => {
    const todofilter: TodoType[] = todos.filter((todo) => (
      todo.completed == true
    ));
    setShowTodo(todofilter);
  };

  return (
    <div className="w-full flex flex-row-reverse">
      <select onChange={(e) => handleFilterTodos(e)} className="border mb-2">
        <option >全て</option>
        <option >未完了</option>
        <option >完了済み</option>
      </select>
    </div>
  );
};

export default ShowCompletedDropdown;