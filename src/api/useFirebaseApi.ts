import { useNavigate } from "react-router-dom";

interface addTodoTypes {
  id: string;
  text: string;
  uid: string;
};

interface checkedTodoTypes {
  uid: string
  id: string;
  completed: boolean;
};

interface editTodoType {
  uid: string;
  id: string;
  newText: string
};

interface deleteTodoType {
  uid: string;
  id: string;
};

interface createEmailAccountType {
  email: string;
  password: string
};

const useFirebaseApi = () => {
  const navigate = useNavigate();

  const serverError = () => {
    navigate("/Internal-Server-Error");
  };

  const getTodoList = async (uid: string) => {
    try {
      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'GET',
        headers: headers,
      };

      const response: Response = await fetch(`https://todo-next-api.mx244.com/getTodoList/?uid=${uid}`, options);
      return response.json();
    } catch (error) {
      console.error("データの取得に失敗しました。: " + error);
      serverError();
      return error;
    };
  };

  const addTodo = async ({ id, text, uid }: addTodoTypes) => {
    try {
      const data: addTodoTypes = {
        id: id,
        uid: uid,
        text: text,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch('https://todo-next-api.mx244.com/addTodo', options);
      return response.json();
    } catch (error) {
      console.error("データの作成に失敗しました。", error);
      serverError();
      return error;
    };
  };

  const checkedTodo = async ({ uid, id, completed }: checkedTodoTypes) => {
    try {
      const data: checkedTodoTypes = {
        uid: uid,
        id: id,
        completed: completed,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };
      const response: Response = await fetch('https://todo-next-api.mx244.com/checkedTodo', options);
      return response.json();
    } catch (error) {
      console.error("データの更新に失敗しました。", error);
      serverError();
      return error;
    };
  };

  const editTodo = async ({ uid, id, newText }: editTodoType) => {
    try {
      const data: editTodoType = {
        uid: uid,
        id: id,
        newText: newText,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch('https://todo-next-api.mx244.com/editTodo', options);
      return response.json();
    } catch (error) {
      console.error("データの更新に失敗しました。", error);
      serverError();
      return error;
    };
  };

  const deleteTodo = async ({ uid, id }: deleteTodoType) => {
    try {
      const data: deleteTodoType = {
        uid: uid,
        id: id
      };
      
      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch('https://todo-next-api.mx244.com/deleteTodo', options);
      return response.json();
    } catch (error) {
      console.error("データの削除に失敗しました。", error);
      serverError();
      return error;
    };
  };

  const createEmailAccount = async ({ email, password }: createEmailAccountType) => {
    try {
      const data: createEmailAccountType = {
        email: email,
        password: password,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch('https://todo-next-api.mx244.com/createemailaccount', options);
      return response.json();
    } catch (error) {
      console.error("アカウントの作成に失敗しました。", error);
      serverError();
      return error;
    };
  };

  const signInEmailPassword = async (email: string, password: string) => {
    try {
      const data: any = {
        email: email,
        password: password,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch("https://todo-next-api.mx244.com/checkAuth", options);
      return response.json();
    } catch (error) {
      console.error("ログイン認証に失敗しました。", error);
      serverError();
      return error;
    };
  };

  return { getTodoList, addTodo, checkedTodo, editTodo, deleteTodo, createEmailAccount, signInEmailPassword };
};

export default useFirebaseApi;