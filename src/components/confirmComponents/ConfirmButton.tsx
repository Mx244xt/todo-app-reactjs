import { useConfirmationDialog } from 'context/ConfirmationDialogContext';
import { ButtonForm } from '../uiComponents';
interface ConfirmType {
  title: string;
  message: string;
  icon: string;
};

const ConfirmButton: React.FC<ConfirmType> = ({ title, message, icon }) => {
  const { openDialog } = useConfirmationDialog();
  const handleButtonClick = () => {
    openDialog(message);
  };
  return (
    <ButtonForm title={title} type='button' textColor='text-white' bgColor='bg-blue-500' icon={icon} clickEvent={handleButtonClick} disabled={false} />
  );
};

export default ConfirmButton;
