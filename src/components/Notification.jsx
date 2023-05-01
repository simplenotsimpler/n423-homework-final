import { useNotification } from "@/contexts/NotificationContext.js";
import NotificationStyles from "../styles/Notification.module.css";

//NOTE: these are only dismissible, no timeout
//third-party libraries implement this better
const NOTIFICATION_ICONS = {
  success: "\u2713",
  error: "\u2BBE",
  warning: "\u26A0",
  info: "\u24D8",
};

const Notification = () => {
  const { notification, removeNotification } = useNotification();
  const handleSubmit = () => {
    removeNotification();
  };

  return (
    <>
      {notification && notification.message && (
        <div
          className={`${NotificationStyles.notificationContainer} ${
            NotificationStyles[notification.type]
          }`}
          onClick={handleSubmit}
        >
          <div className={NotificationStyles.icon}>
            {notification.type === "success" && NOTIFICATION_ICONS.success}
            {notification.type === "error" && NOTIFICATION_ICONS.error}
            {notification.type === "warning" && NOTIFICATION_ICONS.warning}
            {notification.type === "info" && NOTIFICATION_ICONS.info}
          </div>
          <p className={NotificationStyles.text}>{notification.message}</p>
          <button className={NotificationStyles.btnClose}>X</button>
        </div>
      )}
    </>
  );
};

export default Notification;
