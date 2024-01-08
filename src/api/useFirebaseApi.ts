import { useNavigate } from "react-router-dom";
import {
  ADD_TODO_URL,
  CHANGE_INDEX_URL,
  CHECKED_TODO_URL,
  CREATE_EMAIL_ACCOUNT_URL,
  DELETE_TODO_URL,
  EDIT_TODO_URL,
  GET_TODO_LIST_URL,
  PASSWORD_RESET_AUTHCONFIRM_URL,
  SEND_PASSWORD_RESET_EMAIL_URL,
  SIGNIN_EMAIL_PASSWORD_URL
} from "../lib/apiUrl";

interface apiType {
  type: string
}

interface addTodoTypes {
  id: string;
  index: number;
  text: string;
  uid: string;
}

interface checkedTodoTypes {
  uid: string
  id: string;
  completed: boolean;
}

interface editTodoType {
  uid: string;
  id: string;
  newText: string;
  memo: string;
  deadLine: Date;
}

interface deleteTodoType {
  uid: string;
  id: string;
}

interface emailAuthType {
  email: string;
  password: string
}

interface newPasswordType {
  code: string;
  password: string;
}

interface changeIndexType {
  uid: string;
  id: string;
  index: number;
}

interface changeIndexListType {
  list: changeIndexType[];
}

const useFirebaseApi = () => {
  const navigate = useNavigate();

  const serverError = () => {
    navigate("/Internal-Server-Error");
  };

  const changeIndex = async (props: changeIndexType[]) => {
    try {
      const list: changeIndexType[] = [];
      props.map((e, i) => {
        list.push({
          id: e.id,
          uid: e.uid,
          index: i,
        });
        return list;
      });

      const data: changeIndexListType & apiType = {
        list: list,
        type: 'changeSort'
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch(CHANGE_INDEX_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
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

      const response: Response = await fetch(GET_TODO_LIST_URL + `/?uid=${uid}&type=getTodoList`, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const addTodo = async ({ id, index, text, uid }: addTodoTypes) => {
    try {
      const data: addTodoTypes & apiType = {
        type: 'addTodo',
        id: id,
        index: index,
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

      const response: Response = await fetch(ADD_TODO_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const checkedTodo = async ({ uid, id, completed }: checkedTodoTypes) => {
    try {
      const data: checkedTodoTypes & apiType = {
        type: 'checkedTodo',
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
      const response: Response = await fetch(CHECKED_TODO_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const editTodo = async ({ uid, id, newText, memo, deadLine }: editTodoType) => {
    try {
      const data: editTodoType & apiType = {
        type: 'editTodo',
        uid: uid,
        id: id,
        newText: newText,
        memo: memo,
        deadLine: deadLine
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch(EDIT_TODO_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const deleteTodo = async ({ uid, id }: deleteTodoType) => {
    try {
      const data: deleteTodoType & apiType = {
        type: 'deleteTodo',
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

      const response: Response = await fetch(DELETE_TODO_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const createEmailAccount = async ({ email, password }: emailAuthType) => {
    try {
      const data: emailAuthType & apiType = {
        type: 'createEmailAccount',
        email: email,
        password: password,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch(CREATE_EMAIL_ACCOUNT_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const signInEmailPassword = async ({ email, password }: emailAuthType) => {
    try {
      const data: emailAuthType & apiType = {
        type: 'checkAuth',
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

      const response: Response = await fetch(SIGNIN_EMAIL_PASSWORD_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const sendPasswordResetEmail = async ({ email }: { email: string }) => {
    try {
      const data: { email: string } & apiType = {
        type: 'sendPasswordResetEmail',
        email: email,
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch(SEND_PASSWORD_RESET_EMAIL_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const passwordResetAuthConfirm = async ({ code, password }: newPasswordType) => {
    try {
      const data: newPasswordType & apiType = {
        type: 'passwordResetAuthConfirm',
        code: code,
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

      const response: Response = await fetch(PASSWORD_RESET_AUTHCONFIRM_URL, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  return { getTodoList, addTodo, changeIndex, checkedTodo, editTodo, deleteTodo, createEmailAccount, signInEmailPassword, sendPasswordResetEmail, passwordResetAuthConfirm };
};

export default useFirebaseApi;