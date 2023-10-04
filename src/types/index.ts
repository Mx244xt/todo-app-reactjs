export interface TodoType {
  id: string;
  text: string;
  createAt: Date;
  updateAt: Date;
  completed: boolean;
  uid: string;
};

export interface TodoPropsTypes {
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