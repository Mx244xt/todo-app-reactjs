import { useConfirmationDialog } from '../../providers/ConfirmationDialogContext';
import { EventButton } from '../uiComponents';
interface ConfirmType {
  title: string;
  message: string;
  icon: string;
}

const ConfirmButton = ({ title, message, icon }: ConfirmType) => {
  const { openDialog } = useConfirmationDialog();
  const handleButtonClick = () => {
    openDialog(message);
  };
  return (
    <EventButton title={title} type='button' textColor='text-white' bgColor='bg-blue-500' icon={icon} clickEvent={handleButtonClick} disabled={false} />
  );
};

export default ConfirmButton;
