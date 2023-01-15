import { useContext } from "react";
import NotificationContext from "contexts/NotificationProvider";

export const useAlert = () => {
  const { showNotification } = useContext(NotificationContext);
  return { showNotification };
};
