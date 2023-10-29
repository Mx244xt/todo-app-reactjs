
import { TodoType, TodosStateType } from '@/types';
import { useForm } from 'react-hook-form';
import { useLoading } from '../../../hooks';
import { todoListType } from '../../../lib/validationShema';

const useTodos = ({ todos, setTodos }: TodosStateType) => {
  const { isLoading } = useLoading();
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useForm<todoListType>({
  });

  const todoNotFound = () => setError("todoList", {
    type: "manual",
    message: "登録されているタスクはありません。",
  });

  const onAddTodo = (newTodo: TodoType) => {
    setTodos((todos) => [newTodo, ...todos]);
    clearErrors("todoList");
  };

  const onDeleteTodo = (id: string) => {
    const updataTodos: TodoType[] = todos.filter((todo) => (
      todo.id !== id && todo
    ));
    setTodos(updataTodos);
  };

  const onCompletedTodo = (id: string, completed: boolean) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: completed } : todo))
    );
  };

  const onEditTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: text } : todo))
    );
  };

  return {
    todos,
    errors,
    isLoading,
    onAddTodo,
    onDeleteTodo,
    onCompletedTodo,
    onEditTodo,
    setTodos,
    clearErrors,
    todoNotFound
  };
};

export default useTodos;