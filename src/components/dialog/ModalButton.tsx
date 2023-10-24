import { useConfirmationDialog } from '../../providers/ConfirmDialogContext';
interface ConfirmType {
  title: string;
  message: JSX.Element;
}

const ModalButton = ({ title, message }: ConfirmType) => {
  const { openDialog } = useConfirmationDialog();
  const handleButtonClick = () => {
    openDialog(message);
  };
  return (
    <a className='cursor-pointer' onClick={handleButtonClick}>{title}</a>
  );
};

export default ModalButton;
