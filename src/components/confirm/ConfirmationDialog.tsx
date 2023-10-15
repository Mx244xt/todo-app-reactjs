import { useConfirmationDialog } from '../../providers/ConfirmationDialogContext';

interface DialogType {
  action: () => void
}

const ConfirmationDialog = ({ action }: DialogType) => {
  const { isDialogOpen, dialogContent, closeDialog, confirmAction } = useConfirmationDialog();
  return (
    isDialogOpen ?
      (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-40">
          <div className="w-80 bg-white px-5 py-8 rounded-lg shadow-md text-center border border-gray-300 relative sm:absolute sm:top-5 sm:right-5 z-50">
            <p className='mb-5'>{dialogContent}</p>
            <div className='flex justify-between'>
              <button
                className='w-28 p-2 mr-2 border border-gray-300 text-base rounded-s'
                onClick={closeDialog}
              >
                キャンセル
              </button>
              <button
                className='w-28 p-2 ml-2 border border-gray-300 text-base rounded-s bg-blue-500 text-white'
                onClick={() => confirmAction(action)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )
      : <></>
  );
};

export default ConfirmationDialog;
