import { useNavigate } from "react-router-dom";

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
  newText: string
}

interface deleteTodoType {
  uid: string;
  id: string;
}

interface emailAuthType {
  email: string;
  password: string
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

      const data: changeIndexListType = {
        list: list
      };

      const headers = {
        'Content-type': 'Application/json',
      };

      const options = {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data),
      };

      const response: Response = await fetch('https://todo-next-api.mx244.com/changeSort', options);
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

      const response: Response = await fetch(`https://todo-next-api.mx244.com/getTodoList/?uid=${uid}`, options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  const addTodo = async ({ id, index, text, uid }: addTodoTypes) => {
    try {
      const data: addTodoTypes = {
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

      const response: Response = await fetch('https://todo-next-api.mx244.com/addTodo', options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
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
      serverError();
      return error;
    }
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
      serverError();
      return error;
    }
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
      serverError();
      return error;
    }
  };

  const createEmailAccount = async ({ email, password }: emailAuthType) => {
    try {
      const data: emailAuthType = {
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
      serverError();
      return error;
    }
  };

  const signInEmailPassword = async ({ email, password }: emailAuthType) => {
    try {
      const data: emailAuthType = {
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
      serverError();
      return error;
    }
  };
  const PasswordResetSendMail = async ({ email }: { email: string }) => {
    try {
      const data: { email: string } = {
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

      const response: Response = await fetch('https://todo-next-api.mx244.com/createNewPassword', options);
      return response.json();
    } catch (error) {
      serverError();
      return error;
    }
  };

  return { getTodoList, addTodo, changeIndex, checkedTodo, editTodo, deleteTodo, createEmailAccount, signInEmailPassword, PasswordResetSendMail };
};

export default useFirebaseApi;