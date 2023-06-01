import { toast } from 'react-toastify';

export const showRequestErr = error => {
  toast.error(error.data?.message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
