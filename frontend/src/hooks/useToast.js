import { useDispatch, useSelector } from "react-redux";
import { setShowToast } from "../reducers/toastSlice";
import { toast } from "react-toastify";

const useToast = () => {
  const dispatch = useDispatch();
  const showToast = useSelector((state) => state.toast.showToast);

  const notify = (message, type = "info") => {
    if (showToast) return;

    toast[type](message, {
      onOpen: () => dispatch(setShowToast(true)),
      onClose: () => dispatch(setShowToast(false)),
    });
  };

  return { notify, showToast };
};

export default useToast;
