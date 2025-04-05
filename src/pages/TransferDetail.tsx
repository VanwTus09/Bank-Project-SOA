import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface LocationState {
  bank: string;
  account: string;
  name?: string;
}

const TransferDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bank, account, name } = (location.state as LocationState) || {};

  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState<boolean>(false);
  const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false);
  const [beneficiarySaved, setBeneficiarySaved] = useState<boolean>(false);
  const [recipientName, setRecipientName] = useState<string>(name || "");

  useEffect(() => {
    console.log("Bank name nhận được:", bank);
  console.log("Account nhận được:", account);
    if (!name) {
      fetchRecipientName(account, bank);  // Gọi API khi không có tên người nhận
    }
  }, [account, name, bank]);

  const fetchRecipientName = async (account: string, bankName: string) => {
    try {
      const token = localStorage.getItem("token");
      if (bankName.toLowerCase().includes("reenbank")) {
        // API lấy tên người nhận trong hệ thống nếu là ngân hàng Reenbank
        const userResponse = await fetch(`http://localhost:8080/api/bankaccounts/search/user?phoneNumber=${account}`
        );
    
        if (userResponse.ok) {
          const fullName = await userResponse.text();
          setRecipientName(fullName); // Gán tên người nhận vào state
        } else {
          alert("Không tìm thấy người nhận với số điện thoại này.");
        }
      } else {
        // API tìm kiếm tài khoản ngoài ngân hàng
        const otherBankResponse = await fetch(`http://localhost:8080/api/otherbankaccounts/search?id=${account}&bankName=${bankName}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (otherBankResponse.ok) {
          const data = await otherBankResponse.json();
          if (data && data.fullName) {
            setRecipientName(data.fullName); // Gán tên người nhận từ ngân hàng ngoài
          } else {
            alert("Không tìm thấy người nhận với số tài khoản này trong ngân hàng ngoài.");
          }
        } else {
          alert("Không tìm thấy người nhận trong ngân hàng ngoài.");
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy tên người nhận:", error);
      alert("Đã xảy ra lỗi trong quá trình lấy tên người nhận");
    }
  };
  useEffect(() => {
    if (!bank || !account) {
      alert("Thiếu thông tin tài khoản hoặc ngân hàng.");
      navigate("/TransferSelect");
    }
  }, [bank, account, navigate]);
  
  const handleConfirm = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }
    setShowPasswordPrompt(true);
  };

  const handleTransaction = async () => {
    if (!password2) {
      alert("Vui lòng nhập mật khẩu cấp 2");
      return;
    }

    const phoneNumber = localStorage.getItem("phoneNumber");
    if (!phoneNumber) {
      alert("Không tìm thấy số điện thoại đăng nhập");
      return;
    }

    try {
      const passwordCheck = await fetch("http://localhost:8080/api/password2/pass2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, password2 }),
      });

      if (!passwordCheck.ok) {
        alert("Mật khẩu cấp 2 không chính xác");
        return;
      }

      const transactionResponse = await fetch("http://localhost:8080/api/transactions/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          contactAccount: account,
          nameBank: bank,
          money: Number(amount),
          description,
        }),
      });

      if (transactionResponse.ok) {
        setTransactionSuccess(true);
      } else {
        const errorText = await transactionResponse.text();
        alert("Giao dịch thất bại: " + errorText);
      }
    } catch (error) {
      console.error("Lỗi giao dịch:", error);
      alert("Đã xảy ra lỗi trong quá trình giao dịch");
    }
  };

  const handleSaveBeneficiary = async () => {
    try {
      const res = await fetch("/api/save-beneficiary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bank, account, name: recipientName }),
      });

      if (res.ok) {
        setBeneficiarySaved(true);
        alert("Đã lưu người thụ hưởng thành công");
      } else {
        alert("Đã tồn tại người thụ hưởng");
      }
    } catch (error) {
      console.error("Lỗi khi lưu người thụ hưởng:", error);
      alert("Lỗi hệ thống khi lưu người thụ hưởng");
    }
  };

  return (
    <div className="p-6">
      {!transactionSuccess ? (
        <>
          <h1 className="text-2xl font-bold">Nhập thông tin chuyển tiền</h1>
          <p className="mt-4"><strong>Ngân hàng:</strong> {bank}</p>
          <p className="mt-2"><strong>Số tài khoản:</strong> {account}</p>
          <p className="mt-2"><strong>Chủ tài khoản:</strong> {recipientName || "Đang tải..."}</p>

          <input
            type="number"
            placeholder="Số tiền"
            className="border p-3 w-full mt-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Ghi chú"
            className="border p-3 w-full mt-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-6 py-3 mt-4"
            onClick={handleConfirm}
          >
            Xác nhận
          </button>

          {showPasswordPrompt && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md">
              <p className="mb-2">Nhập mật khẩu cấp 2 để xác nhận giao dịch</p>
              <input
                type="password"
                placeholder="Mật khẩu cấp 2"
                className="border p-3 w-full"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-6 py-3 mt-4 w-full"
                onClick={handleTransaction}
              >
                Xác nhận giao dịch
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="p-6 border border-gray-300 rounded-md mt-4">
          <h2 className="text-xl font-bold text-green-600">Giao dịch thành công!</h2>
          <p className="mt-4"><strong>Ngân hàng:</strong> {bank}</p>
          <p className="mt-2"><strong>Số tài khoản:</strong> {account}</p>
          <p className="mt-2"><strong>Chủ tài khoản:</strong> {recipientName || "Không tìm thấy"}</p>
          <p className="mt-2"><strong>Số tiền:</strong> {Number(amount).toLocaleString()} VND</p>
          <p className="mt-2"><strong>Ghi chú:</strong> {description}</p>

          <div className="mt-4 flex gap-4">
            <button
              className="bg-gray-500 text-white px-6 py-3"
              onClick={() => navigate("/")}
            >
              Về trang chủ
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3"
              onClick={handleSaveBeneficiary}
              disabled={beneficiarySaved}
            >
              {beneficiarySaved ? "Đã lưu người thụ hưởng" : "Lưu người thụ hưởng"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferDetails;
