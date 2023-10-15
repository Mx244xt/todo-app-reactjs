
import { SubmitButton, InputForm, Loading } from '../uiComponents';
import useAddTodo from './hooks/useAddTodo';

const AddTask = () => {
  const {
    state: { isLoading, errors },
    action: { register, handleSubmit, handleAddTodo }
  } = useAddTodo();
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
      <SubmitButton title='タスクの追加' textColor='text-white' bgColor={isLoading ? 'bg-blue-300' : 'bg-blue-500'} icon='/images/plus_icon.png' disabled={isLoading} />
      {isLoading && <Loading />}
    </form>
  );
};

export default AddTask;