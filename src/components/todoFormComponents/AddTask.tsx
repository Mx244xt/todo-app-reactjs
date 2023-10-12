import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import useFirebaseApi from '../../api/useFirebaseApi';
import { useCookiesHooks, useLoading } from '../../hooks';
import { todoFormType, todoValidationShema } from '../../lib/validationShema';
import { ResponseTodoType, TodoPropsTypes } from '../../types';
import { ButtonForm, InputForm, Loading } from '../uiComponents';

const AddTask = ({ todos, onAddTodo }: TodoPropsTypes) => {
  const { isLoading, startLoding, stopLoding } = useLoading();
  const { cookies, logOut, updateSessionTime } = useCookiesHooks();
  const { addTodo } = useFirebaseApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
    clearErrors,
  } = useForm<todoFormType>({
    mode: 'onSubmit',
    resolver: zodResolver(todoValidationShema),
  });

  const badResponse = () => setError("todo", {
    type: "manual",
    message: "データの作成に失敗しました。",
  });

  const handleAddTodo: SubmitHandler<todoFormType> = async ({ todo }: { todo: string }) => {
    resetField("todo");
    updateSessionTime();
    if (cookies.uid !== undefined) {
      try {
        startLoding();
        const id = uuidv4();
        const response: ResponseTodoType = await addTodo({ id: id, index: todos.length, text: todo, uid: cookies.uid });
        if (response.statusCode === 200) {
          const newTodo = response.todoList;
          newTodo.id = id;
          onAddTodo(newTodo);
        } else {
          console.error(response.statusCode, response.message);
          badResponse();
        }
      } catch (error) {
        console.error("500: ", error);
        badResponse();
      } finally {
        stopLoding();
      }
    } else {
      setError("todo", {
        type: "manual",
        message: "IDの有効期限が切れています。",
      });
      setTimeout(() => {
        clearErrors("todo");
        logOut();
      }, 3000);
    }
  };

  useEffect(() => {
    window.addEventListener('click', () => {
      if (errors.todo) {
        setTimeout(() => {
          clearErrors("todo");
        }, 3000);
      }
    });
  }, [errors.todo]);

  const emptyEvent = () => { };

  return (
    <form className='mb-4 space-y-3' onSubmit={handleSubmit(handleAddTodo)}>
      <InputForm
        title=''
        type='text'
        id='todo'
        register={register("todo")}
        errors={errors}
        placeholder='追加するタスクを入力してください。'
      />
      <ButtonForm title='タスクの追加' type='submit' textColor='text-white' bgColor={isLoading ? 'bg-blue-300' : 'bg-blue-500'} icon='/images/plus_icon.png' clickEvent={emptyEvent} disabled={isLoading} />
      {isLoading && <Loading />}
    </form>
  );
};

export default AddTask;