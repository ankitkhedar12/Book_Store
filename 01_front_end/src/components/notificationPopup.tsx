import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';

type ToastButtonProps = {
    message: string;
  };

export const ToastButton: React.FC<ToastButtonProps> = (props) => {
    const { message } = props;
//   const handleClick = () => {
//     toast(message);
//   };

  return (
    <>
    {/* {toast(message)} */}
    <ToastContainer />
    </>
  );
};
