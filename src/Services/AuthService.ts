export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  token: string;
  balance: number;
}
export interface BankAccount {
  balance: number;
  currency: string; 
  phoneNumber: string;
}
export interface LoginHistoryItem {
  loginTime: string;  
  loginID: string;
  phoneNumber: string;
  userID: string;
}
export interface NotificationItem{
  phoneNumber : string;
  title : string;
  description : string;
  createdAt : string;
}
export interface TransactionItem{
  description : string;
  phoneNUmber : string;
  money :number;
  completedAt : string;
  toFullName : string;
}
export interface OtherbankItem{
  contactAccount : string;
  bankName: string;
  fullName : string;
  currency : string;
  balance : number;
}
export interface Contact{
  phoneNumber : string;
  contactName : string;
  contactAccount : string;
  bankName : string;
}
const API_URL = "http://localhost:8080/api";

const AuthService = {
  //  Đăng nhập và lấy token
  login: async (phoneNumber: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập thất bại!");
      }

      const data = await response.json();
      if (!data.token || !data.user ) {
        throw new Error("Dữ liệu trả về không hợp lệ!");
      }
      // Cập nhật: Lưu token và kiểm tra xem đã lưu thành công chưa
    localStorage.setItem("token", data.token);
    console.log("Token đã lưu:", localStorage.getItem("token")); // Debug 

      // Lưu user, token, BankAccount vào localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("BankAccount", JSON.stringify(data.BankAccount));
      localStorage.setItem("phoneNumber",data.user.phoneNumber)
      
      return data.user;
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
      throw err;
    }
  },
  getBalance: async (): Promise<number> => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!token) throw new Error("Bạn chưa đăng nhập!");
  
      const res = await fetch(`${API_URL}/bankaccounts/search?phoneNumber=${user.phoneNumber}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`,},
        
      });
  
      console.log("Response status:", res.status, res.statusText);
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Lỗi API: ${res.status} - ${errorText}`);
      }
  
      const data = await res.json();
      console.log("Dữ liệu trả về từ API:", data);
  
      if (data.balance === undefined) {
        throw new Error("Dữ liệu API không hợp lệ!");
      }
  
      return data.balance;
    } catch (err) {
      console.error("Lỗi lấy số dư:", err);
      throw err;
    }
  }
  ,
  getLoginHistory: (): LoginHistoryItem | null => {
    const LoginHistoryItem = localStorage.getItem("loginhistory");
    return LoginHistoryItem ? JSON.parse(LoginHistoryItem) : null;
  },
  // 📌 Lấy thông tin user từ LocalStorage
  getUser: (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  // 📌 Đăng xuất
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("Đã đăng xuất!");
  },
};

export default AuthService;
