import { useNotification } from "@/contexts/NotificationContext.js";
import NotificationStyles from "../styles/Notification.module.css";

//TODO: proptypes to restrict status? https://jaketrent.com/post/react-oneof-vs-oneoftype/

//TODO: if time, add a time out
//TODO: move user to top of page

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
            NotificationStyles[notification.status]
          }`}
          onClick={handleSubmit}
        >
          <div className={NotificationStyles.icon}>
            {notification.status === "success" && NOTIFICATION_ICONS.success}
            {notification.status === "error" && NOTIFICATION_ICONS.error}
            {notification.status === "warning" && NOTIFICATION_ICONS.warning}
            {notification.status === "info" && NOTIFICATION_ICONS.info}
          </div>
          <p className={NotificationStyles.text}>{notification.message}</p>
          <button className={NotificationStyles.btnClose}>X</button>
        </div>
      )}
    </>
  );
};

export default Notification;
