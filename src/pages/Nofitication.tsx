import { useEffect, useState } from "react";
import { NotificationItem } from "../Services/AuthService";

const Notification = () => {
  const [notification, setNotification] = useState<NotificationItem[]>([]);
  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    const fetchNotification = async () => {
      try {
        const res = await fetch(`${API_URL}/notifications/search?phoneNumber=${user.phoneNumber}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Lỗi khi lấy lịch sử thông báo: ${errorText}`);
        }

        const data = await res.json();
        console.log("Response data:", data);

        // Kiểm tra dữ liệu trả về
        if (Array.isArray(data)) {
          setNotification(data); // Sử dụng mảng trực tiếp từ data
        } else {
          console.error("Dữ liệu trả về không phải là mảng.");
        }
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };

    fetchNotification();
  }, []); // Chỉ chạy một lần khi component mount
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
};
  return (
    <div style={{ padding: "1rem" }}>
      <h2 className="text-3xl font-bold py-10"> Thông báo</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {notification.length > 0 ? (
          notification.map((item, index) => (
            <li
              key={index}
              style={{
                background: "#f1f1f1",
                marginBottom: "2rem",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <h3 style={{ margin: 0 }} className="py-2 text-lg">{item.title}</h3>
              <p style={{ margin: "0.5rem 0" }} className="py-2 text-lg">{item.description}</p>
              <small style={{ color: "#666" }} className="py-2 text-lg">
                📅 {formatDate(item.createdAt)}
              </small>
            </li>
          ))
        ) : (
          <li>Chưa có thông báo nào.</li>
        )}
      </ul>
    </div>
  );
};

export default Notification;
