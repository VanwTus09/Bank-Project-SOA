import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Điều hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-300 px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center space-y-6">
        {/* Avatar + Tên User */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`} // Avatar theo tên user
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-lg"
          />
          <h1 className="text-3xl font-semibold text-gray-800">{user.fullName}!</h1>
        </div>

       

        {/* Các nút điều hướng */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/Overview/Account")}
            className="w-full bg-gray-500 text-white py-3 rounded-md font-medium shadow-lg hover:bg-blue-600 transition"
          >
             Overview Account
          </button>
          <button
            onClick={() => navigate("/Overview/TransferSelect")}
            className="w-full bg-gray-500 text-white py-3 rounded-md font-medium shadow-lg hover:bg-blue-600 transition"
          >
          Transfer Money

          </button>
          <button
            onClick={() => navigate("/Overview/TransactionHistory")}
            className="w-full bg-gray-500 text-white py-3 rounded-md font-medium shadow-lg hover:bg-blue-600 transition"
          >
             Transaction History
          </button>
          <button
            onClick={() => navigate("/Overview/LoginHistory")}
            className="w-full bg-gray-500 text-white py-3 rounded-md font-medium shadow-lg hover:bg-blue-600 transition"
          >
             Login History
          </button>
          <button
            onClick={() => navigate("/Overview/Notification")}
            className="w-full bg-gray-500 text-white py-3 rounded-md font-medium shadow-lg hover:bg-blue-600 transition"
          >
             Notification
          </button>
          
        </div>

        {/* Nút Logout */}
        <button
          onClick={logout}
          className="mt-6 text-red-500 font-medium hover:text-gray-600 transition hover:scale-120 cursor-pointer  "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Overview;
