import { useConfirmationDialog } from '../../providers/ConfirmDialogContext';

interface DialogType {
  action: () => void
}

const ModalDialog = ({ action }: DialogType) => {
  const { isDialogOpen, dialogContent, confirmAction } = useConfirmationDialog();
  return (
    isDialogOpen ?
      (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-40">
          <div className="w-11/12 md:w-2/3 h-5/6 md:h-3/4 bg-white px-5 py-8 rounded-lg shadow-md text-center border border-gray-300 relative sm:absolute overflow-auto z-40">
            <p className='mb-5'>{dialogContent}</p>
            <button
              className='w-28 p-2 ml-2 border border-gray-300 text-base rounded-s bg-blue-500 text-white'
              onClick={() => confirmAction(action)}>
              閉じる
            </button>
          </div>
        </div>
      )
      : <></>
  );
};

export default ModalDialog;
