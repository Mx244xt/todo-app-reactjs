import { Id, toast } from "react-toastify";

const useToast = () => {

  const loadingToast = () => {
    const id = toast.loading("データ更新中", { closeOnClick: true });
    return id;
  };

  const successToast = (id: Id) => {
    if (id == null) return;
    toast.update(id, {
      render: "データを更新しました。",
      type: "success",
      isLoading: false,
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  const errorToast = (id: Id) => {
    if (id == null) return;
    toast.update(id, {
      render: "データの更新に失敗しました。",
      type: "error",
      isLoading: false,
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  const logInToast = () => {
    toast.success("ログインしました。", {
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  const logOutToast = () => {
    toast.success("ログアウトしました。", {
      autoClose: 1000,
      closeOnClick: true,
      hideProgressBar: true
    });
  };

  return { loadingToast, successToast, errorToast, logInToast, logOutToast };
};

export default useToast;