import { Id, toast } from "react-toastify";

const useToast = () => {

  const loadingToast = () => {
    const id = toast.loading("データ更新中", { closeOnClick: true });
    return id;
  };

  const successUpdateToast = (id: Id, message: string) => {
    if (id == null) return;
    toast.update(id, {
      render: message,
      type: "success",
      isLoading: false,
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  const errorUpdateToast = (id: Id, message: string) => {
    if (id == null) return;
    toast.update(id, {
      render: message,
      type: "error",
      isLoading: false,
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  const successToast = (message: string) => {
    toast.success(message, {
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  return { loadingToast, successUpdateToast, errorUpdateToast, successToast };
};

export default useToast;