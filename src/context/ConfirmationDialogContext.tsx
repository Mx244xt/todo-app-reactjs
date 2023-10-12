
import React, { createContext, useContext, useState } from 'react';

interface ConfirmationDialogContextType {
  isDialogOpen: boolean;
  dialogContent: string;
  openDialog: (content: string) => void;
  closeDialog: () => void;
  confirmAction: (action: () => void) => void;
}

const ConfirmationDialogContext = createContext<ConfirmationDialogContextType | undefined>(undefined);

export const ConfirmationDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');

  const openDialog = (content: string) => {
    setDialogContent(content);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent('');
  };

  const confirmAction = (action: () => void) => {
    action();
    closeDialog();
  };

  return (
    <ConfirmationDialogContext.Provider value={{ isDialogOpen, dialogContent, openDialog, closeDialog, confirmAction }}>
      {children}
    </ConfirmationDialogContext.Provider>
  );
};

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);
  if (context === undefined) {
    throw new Error('useconfirmationDialogは、confirmationDialogProvider内で使用する必要があります');
  }
  return context;
};
