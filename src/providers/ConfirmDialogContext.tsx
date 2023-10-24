
import React, { createContext, useContext, useReducer, useState } from 'react';

interface ConfirmationDialogContextType {
  isDialogOpen: boolean;
  dialogContent: JSX.Element;
  openDialog: (content: JSX.Element) => void;
  closeDialog: () => void;
  confirmAction: (action: () => void) => void;
}

const ConfirmDialogContext = createContext<ConfirmationDialogContextType | undefined>(undefined);

export const ConfirmationDialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [dialogContent, setDialogContent] = useState('');

  const reducer = (bool: JSX.Element, content: JSX.Element) => {
    if (isDialogOpen) {
      return <>{content}</>;
    } else {
      return <></>;
    }
  };
  const [dialogContent, setDialogContent] = useReducer(reducer, <></>);

  const openDialog = (content: JSX.Element) => {
    // setDialogContent(content);
    setIsDialogOpen(true);
    setDialogContent(content);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDialogContent(<></>);
  };

  const confirmAction = (action: () => void) => {
    action();
    closeDialog();
  };

  return (
    <ConfirmDialogContext.Provider value={{ isDialogOpen, dialogContent, openDialog, closeDialog, confirmAction }}>
      {children}
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmDialogContext);
  if (context === undefined) {
    throw new Error('useconfirmationDialogは、confirmationDialogProvider内で使用する必要があります');
  }
  return context;
};
