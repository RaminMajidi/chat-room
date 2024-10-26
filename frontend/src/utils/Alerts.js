import toast from "react-hot-toast";

export const errorAlert = (error) => {
  const messgae = error?.response?.data?.message || error?.message || "An error occurred, the operation failed!!";
  toast.error(messgae);
}

export const messageAlert = (userName) => {
  const message = `new message from ${userName}`;
  toast(message, {
    icon: '🔔',
  });
}
