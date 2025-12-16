import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Giả sử bạn có context user

const Navbar = () => {
  const { user, logout } = useAuth(); // Lấy user từ AuthContext
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Chặn truy cập trang "/" khi đã đăng nhập
  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/Overview"); // Điều hướng đến trang chính
    }
  }, [user, location, navigate]);

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-6  bg-green-100 shadow-md relative">
      {/* Logo */}
      <Link to={!user ? "/" : "/Overview"}>
        <div className="flex items-center space-x-3">
          <img src="./logobank.png" alt="logo" className="h-9" />
          <h1 className="text-2xl font-bold text-green-600">Reen Bank</h1>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-lg">
        <Link to="/about" className="hover:text-green-600 transition-colors">
          About
        </Link>
        <Link to="/contact" className="hover:text-green-600 transition-colors">
          Contact Us
        </Link>
      </div>

      {/* Hiển thị Avatar hoặc Login Button */}
      <div className="hidden md:flex items-center space-x-4">
        {!user ? (
          <Link to="/Login">
            <button className="bg-green-500 text-white px-5 py-2 rounded-md text-lg shadow-md transition-transform hover:scale-105">
              Login
            </button>
          </Link>
        ) : (
          <div className="relative">
            <img
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.fullName}`}
              alt="User Avatar"
              className="h-10 w-10 rounded-full border-2 border-green-500 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
                <p className="text-gray-700 px-4 py-2">{user.fullName}</p>
                <Link to="/"><button
                
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    logout();
                  }}
                >
                  Logout
                </button></Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-100 shadow-md p-6 flex flex-col space-y-4 text-lg z-50 md:hidden">
          <Link to="/about" className="hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="hover:text-green-600 transition-colors" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
          {!user ? (
            <Link to="/Login" onClick={() => setIsOpen(false)}>
              <button className="bg-green-500 text-white px-5 py-2 rounded-md shadow-md w-full">
                Login
              </button>
            </Link>
          ) : (
            <button
              className="bg-red-500 text-white px-5 py-2 rounded-md shadow-md w-full"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
