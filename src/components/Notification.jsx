import { useNotification } from "@/contexts/NotificationContext.js";

const Notification = () => {
  const { notification, removeNotification } = useNotification();
  const handleSubmit = () => {
    removeNotification();
  };
  return (
    <div>
      {notification && notification.message && (
        <>
          <p>Status: {notification.status}</p>
          <p onClick={handleSubmit}>{notification.message}</p>
        </>
      )}
    </div>
  );
};

export default Notification;
