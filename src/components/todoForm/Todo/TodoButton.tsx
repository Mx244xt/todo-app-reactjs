import { UseFormHandleSubmit } from "react-hook-form";

interface TodoButtonType {
  isEditing: boolean;
  handleSubmit: UseFormHandleSubmit<{ todo: string; }, undefined>;
  handleSave: () => Promise<void>;
  handleEdit: () => void;
  handleReset: () => void;
  handleDelete: () => Promise<void>;
}

const TodoButton = ({ isEditing, handleSubmit, handleSave, handleEdit, handleReset, handleDelete }: TodoButtonType) => {
  return (
    <div className='flex flex-col items-end w-24 sm:flex-row sm:items-center'>
      {isEditing ? (
        <button type="button" className='text-green-500 mr-3' onClick={handleSubmit(handleSave)}>保存</button>
      ) : (
        <button type='button' className='text-green-500 mr-3' onClick={handleEdit}>編集</button>
      )}
      {isEditing ? (
        <button type='button' className='text-red-500 mr-3' onClick={handleReset}>戻る</button>
      ) : (
        <button type='button' className='text-red-500 mr-3' onClick={handleDelete}>削除</button>
      )}

    </div>
  );
};

export default TodoButton;