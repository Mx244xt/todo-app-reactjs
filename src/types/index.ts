export interface TodoType {
  id: string;
  index: number;
  text: string;
  createAt: {
    seconds: number;
    nanoseconds: number;
  };
  updateAt: {
    seconds: number;
    nanoseconds: number;
  };
  completed: boolean;
  uid: string;
}

export interface TodoPropsTypes {
  todos: TodoType[];
  onAddTodo: (data: TodoType) => void;
}

export interface TodosStateType {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

export interface TodoPropsType {
  todo: TodoType;
  onAddTodo: (data: TodoType) => void;
  onDeleteTodo: (id: string) => void;
  onCompletedTodo: (id: string, completed: boolean) => void;
  onEditTodo: (id: string, text: string) => void;
}

export interface ResponseTodoType {
  statusCode: number;
  todoList: string & TodoType;
  message: string;
}

export interface ResponseAccountType {
  statusCode: number;
  uid: string;
  message: string;
}

export interface CookiesType {
  uid?: string;
  loginTime?: number;
  elapsedTime?: number;
}