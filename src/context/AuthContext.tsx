import { createContext, useContext, useState } from "react";
import AuthService, {   LoginHistoryItem, User } from "../Services/AuthService";

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
  user: User | null;
  balance: number,
  login: (phoneNumber: string, password: string) => Promise<void>;
  logout: () => void;
  loginhistory : LoginHistoryItem | null ;
  getBalance : () =>Promise<void>;
  
}

// Tạo context, ban đầu là null
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

// Provider cho AuthContext
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(AuthService.getUser()); // Lấy user từ localStorage nếu có
  const [loginhistory,setLoginHistory] = useState<LoginHistoryItem | null>(AuthService.getLoginHistory())
  const [balance, setBalance] = useState<number>(0);

 const getBalance = async()=>{
  try {
    const balanceData = await AuthService.getBalance();
    if (!balanceData) throw new Error("Sai số điện thoại hoặc mật khẩu!");

    setBalance(balanceData);
   
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);

    // Kiểm tra nếu error có dạng `Error`
    const errorMessage =
      error instanceof Error ? error.message : "Đăng nhập thất bại!";
      
    throw new Error(errorMessage);
  }
 }
  


  // Đăng nhập
  const login = async (phoneNumber: string, password: string) => {
    try {
      const userData = await AuthService.login(phoneNumber, password);
      if (!userData) throw new Error("Sai số điện thoại hoặc mật khẩu!");

      setUser(userData);
     
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
  
      // Kiểm tra nếu error có dạng `Error`
      const errorMessage =
        error instanceof Error ? error.message : "Đăng nhập thất bại!";
        
      throw new Error(errorMessage);
    }
  };

  // Đăng xuất
  const logout = () => {
    AuthService.logout();
    setUser(null);
    setLoginHistory(null)
    setBalance(0);
  };

  return (
    <AuthContext.Provider value={{ user, balance, loginhistory, login, logout,getBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook `useAuth` để lấy context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
