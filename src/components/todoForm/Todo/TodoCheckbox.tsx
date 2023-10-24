interface TodoCheckboxType {
  isCompleted: boolean;
  handleCompleted: () => Promise<void>;
}
const TodoCheckbox = ({ handleCompleted, isCompleted }: TodoCheckboxType) => {
  return (
    <div>
      <input id="completed" type="checkbox" className='mr-3 w-5 cursor-pointer' onChange={handleCompleted} checked={isCompleted} />
    </div>
  );
};

export default TodoCheckbox;