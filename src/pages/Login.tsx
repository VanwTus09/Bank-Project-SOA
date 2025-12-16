import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Nếu dùng React Router
import { useAuth } from "../context/AuthContext"; // Đúng context
import * as HistoryService from "../Services/HistoryService"

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading

  // 
  const isValidPhoneNumber = (phone: string) => {
    return /^[0-9]{10,11}$/.test(phone);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidPhoneNumber(phoneNumber)) {
      setError("Số điện thoại không hợp lệ!");
      return;
    }

    setLoading(true); //  Hiển thị trạng thái đang xử lý

    try {
      await login(phoneNumber, password);
      await HistoryService.loginsavetime(phoneNumber )
      console.log(" Đăng nhập thành công!");
       navigate("/Overview"); // Chuyển hướng sau khi đăng nhập thành công
    } catch (err) {
      console.error(" Lỗi đăng nhập:", err);

      // Nếu lỗi từ server có message, hiển thị nó
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-green-100 px-6 py-16 lg:px-20 lg:py-24 bg-[url(./background-soa.png)]">
      <div className="max-w-[1400px] w-full flex flex-col lg:flex-row items-center justify-between">
        {/* Phần giới thiệu bên trái */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <img src="./logobank.png" alt="logo" className="h-10" />
            <h1 className="text-green-600 text-3xl lg:text-4xl font-semibold">Reen Bank</h1>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mt-4">
            Welcome Back
          </h2>
          <p className="text-gray-600 mt-6 text-lg lg:text-xl">
            Enter Your Details to login to your Banking Dashboard again!
          </p>
        </div>

        {/* Form đăng nhập */}
        <div className="bg-white p-10 rounded-xl shadow-lg max-w-md lg:max-w-lg w-full mt-10 lg:mt-0">
          <h3 className="text-green-600 text-3xl font-semibold text-center">Login</h3>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <form className="mt-6 space-y-6" onSubmit={handleLogin}>
            {/* Phone */}
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full border-gray-300 rounded-md px-4 py-3 focus:ring-green-500 focus:border-green-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border-gray-300 rounded-md px-4 py-3 focus:ring-green-500 focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              disabled={!phoneNumber || !password || loading}
              className={`w-full text-white text-lg font-semibold py-3 rounded-md shadow-md transition 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
