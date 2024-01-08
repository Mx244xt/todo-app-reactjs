import { useConfirmationDialog } from '../../providers/ConfirmDialogContext';
interface ConfirmType {
  title: string;
  message: JSX.Element;
  disabled: boolean;
  action: () => void;
}

const ModalButton = ({ title, message, disabled, action }: ConfirmType) => {
  const { openDialog } = useConfirmationDialog();
  const handleButtonClick = () => {
    openDialog(message);
    action();
  };
  return (
    <>
      <a className={`cursor-pointer ${disabled ? 'text-gray-500' : 'text-blue-500'}`} onClick={handleButtonClick}>{title}</a>
    </>
  );
};

export default ModalButton;
