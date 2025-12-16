import { useEffect, useState } from "react";
import { TransactionItem } from "../Services/AuthService";
import { FaArrowRight } from "react-icons/fa";

const TransactionHistory = () => {
  const [history, setHistory] = useState<TransactionItem[]>([]);
  const token = localStorage.getItem("token");
  const myPhone = localStorage.getItem("phoneNumber") ?? ""; // fallback nếu null
  const API_URL = "http://localhost:8080/api";

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Lỗi khi lấy lịch sử giao dịch!");

        const data = await res.json();
        if (Array.isArray(data)) {
          setHistory(data);
        } else {
          setHistory([]);
        }
      } catch (err) {
        console.error("Lỗi:", err);
        setHistory([]);
      }
    };

    fetchTransactionHistory();
  }, [token]);

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📒 Lịch Sử Giao Dịch</h2>
      {history.length === 0 ? (
        <p style={{ textAlign: "center" }}>Không có giao dịch nào.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {history.map((item, index) => {
            const isSent = item.phoneNumber !== myPhone;

            return (
              <div
                key={index}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "12px",
                  padding: "15px 20px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                  <FaArrowRight style={{ marginRight: "10px", color: isSent ? "#10b981" : "#ef4444" }} />
                  <span>
                    <strong>{isSent ? "Nhận từ" : "Chuyển tới"}:</strong>{" "}
                    {item.toFullName}
                  </span>
                </div>
                <div><strong>Số điện thoại:</strong> {item.phoneNumber}</div>
                <div><strong>Mô tả:</strong> {item.description}</div>
                <div>
                  <strong>Số tiền:</strong>{" "}
                  <span style={{ color: isSent ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
                    {isSent ? "+" : "-"}{item.money.toLocaleString("vi-VN")} ₫
                  </span>
                </div>
                <div><strong>Thời gian:</strong> {new Date(item.completedAt).toLocaleString("vi-VN")}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
