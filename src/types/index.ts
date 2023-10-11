export interface TodoType {
  id: string;
  index: number;
  text: string;
  createAt: Date;
  updateAt: Date;
  completed: boolean;
  uid: string;
};

export interface TodoPropsTypes {
  todos: TodoType[];
  onAddTodo: (data: TodoType) => void;
};

export interface ResponseTodoType {
  statusCode: number;
  todoList: string & TodoType;
  message: string;
};

export interface ResponseAccountType {
  statusCode: number;
  uid: string;
  message: string;
};

export interface CookiesType {
  uid?: string;
  loginTime?: number;
  elapsedTime?: number;
};