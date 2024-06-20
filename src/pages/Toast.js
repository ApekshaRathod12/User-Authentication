import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const defaultToastOptions = {
//   position: 'top-right',
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
// };

export const showToast = (type, msg) => {
  switch (type) {
    case 'success':
      toast.success(msg);
      break;
    case 'error':
      toast.error(msg);
      break;
    case 'info':
      toast.info(msg);
      break;
    case 'warning':
      toast.warning(msg);
      break;
    default:
      toast(msg);
      break;
    // case 'success':
    //   toast.success(msg, defaultToastOptions);
    //   break;
    // case 'error':
    //   toast.error(msg, defaultToastOptions);
    //   break;
    // case 'info':
    //   toast.info(msg, defaultToastOptions);
    //   break;
    // case 'warning':
    //   toast.warning(msg, defaultToastOptions);
    //   break;
    // default:
    //   toast(msg, defaultToastOptions);
    //   break;
  }
};

const Toast = () => (
  <ToastContainer 
    position = 'top-right'
  autoClose = {5000}
  hideProgressBar = {false}
  closeOnClick =  {true}
  pauseOnHover = {true}
  draggable = {true}
  progress = {undefined}
  />

);

export default Toast;