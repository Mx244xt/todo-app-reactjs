import { TodosStateType } from '@/types';
import { SubmitButton, InputForm } from '../uiComponents';
import useAddTodo from './hooks/useAddTodo';

const AddTask = ({ isLoading, todos, setTodos }: TodosStateType & { isLoading: boolean }) => {
  const addProps = useAddTodo({ todos, setTodos });
  return (
    <form className=' my-4 space-y-3' onSubmit={addProps.handleSubmit(addProps.handleAddTodo)}>
      <InputForm
        title=''
        type='text'
        id='todo'
        register={addProps.register("todo")}
        errors={addProps.errors}
        placeholder='追加するタスクを入力してください。'
      />
      <SubmitButton title='タスクの追加' textColor='text-white' bgColor={isLoading ? 'bg-blue-300' : 'bg-blue-500'} icon='/images/plus_icon.png' disabled={isLoading} />
    </form>
  );
};

export default AddTask;