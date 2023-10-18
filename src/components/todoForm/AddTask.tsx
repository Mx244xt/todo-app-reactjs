import { TodosStateType } from '@/types';
import { SubmitButton, InputForm } from '../uiComponents';
import useAddTodo from './hooks/useAddTodo';

const AddTask = ({ todos, setTodos }: TodosStateType) => {
  const {
    state: { errors },
    action: { register, handleSubmit, handleAddTodo }
  } = useAddTodo({ todos, setTodos });
  return (
    <form className=' my-4 space-y-3' onSubmit={handleSubmit(handleAddTodo)}>
      <InputForm
        title=''
        type='text'
        id='todo'
        register={register("todo")}
        errors={errors}
        placeholder='追加するタスクを入力してください。'
      />
      <SubmitButton title='タスクの追加' textColor='text-white' bgColor='bg-blue-500' icon='/images/plus_icon.png' disabled={false} />
    </form>
  );
};

export default AddTask;