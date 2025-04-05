import { useEffect, useState } from "react";
import { LoginHistoryItem } from "../Services/AuthService";
import moment from "moment-timezone";

const LoginHistory = () => {
  const [history, setHistory] = useState<LoginHistoryItem[]>([]);
  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");

    const fetchLoginHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/loginhistory/search?phoneNumber=${user.phoneNumber}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Lỗi khi lấy lịch sử đăng nhập: ${errorText}`);
        }

        const data = await res.json();
        console.log("Response data:", data);

        // Kiểm tra dữ liệu trả về
        if (Array.isArray(data)) {
          setHistory(data); // Sử dụng mảng trực tiếp từ data
        } else {
          console.error("Dữ liệu trả về không phải là mảng.");
        }
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };

    fetchLoginHistory();
  }, []); // Chỉ chạy một lần khi component mount
  
  return (
    <div>
      <h2 className="text-3xl font-bold py-10">Lịch Sử Đăng Nhập</h2>
      <ul>
        {history.length > 0 ? (
          history.map((item, index) => {
            console.log("Login time item:", item.loginTime); // Kiểm tra loginTime
            return (
              <li key={index}  
              style={{
                background: "#f1f1f1",
                marginBottom: "2rem",
                padding: "1rem",
                borderRadius: "8px",
              }}>
                
                {item.loginTime ? moment.tz(item.loginTime, "Asia/Ho_Chi_Minh").add(7, "hours").format("LLLL") : ""}

              </li>
            );
          })
        ) : (
          <li>Chưa có lịch sử đăng nhập nào.</li>
        )}
      </ul>
    </div>
  );
};

export default LoginHistory;
