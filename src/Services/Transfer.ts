const API_URL = "http://localhost:8080/api/user";

 const TransferService = {
  async getAccountHolder(bank: string, accountNumber: string): Promise<string | null> {
    try {
      const response = await fetch(`${API_URL}/validate-account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bank, accountNumber }),
      });
      const data = await response.json();
      return data.accountHolder ?? null;
    } catch (error) {
      console.error("Lỗi kiểm tra tài khoản:", error);
      return null;
    }
  },

  async initiateTransfer(token: string, receiver: string, amount: string): Promise<void> {
    try {
      await fetch(`${API_URL}/transfer/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ receiver, amount }),
      });
    } catch (error) {
      console.error("Lỗi khởi tạo chuyển tiền:", error);
      throw new Error("Không thể khởi tạo giao dịch");
    }
  },

  async confirmTransfer(token: string, otp: string): Promise<void> {
    try {
      await fetch(`${API_URL}/transfer/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ otp }),
      });
    } catch (error) {
      console.error("Lỗi xác nhận chuyển tiền:", error);
      throw new Error("OTP không hợp lệ");
    }
  },
};
export default TransferService;