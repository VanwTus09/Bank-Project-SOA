import {  useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useAuth } from "../context/AuthContext";

interface SectionState {
  payment: boolean;
  saving: boolean;
  goal: boolean;
  loan: boolean;
}

const AccountOverview = () => {
  const [openSections, setOpenSections] = useState<SectionState>({
    payment: true,
    saving: false,
    goal: false,
    loan: false,
  });
  const { user, getBalance, balance } = useAuth();
  useEffect(() => {getBalance()}, [])

  const toggleSection = (section: keyof SectionState) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section], 
    }));
  };
  const formatCurrency = (amount: number) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  
  return (
    <div className="min-h-screen bg-[url(./background-soa.png)]  p-4">
      {/* Header */}
      <div className="flex justify-between items-center text-blue-700 text-lg font-bold p-4">
        <button className="text-xl">&#x2190;</button>
        <h1 className="text-xl">Tổng quan tài khoản</h1>
        <FaHome size={24} />
      </div>

      {/* Account Navigation */}
      <div className="flex bg-green-300 rounded-full p-2 mx-4">
        <button className="flex-1 text-center text-blue-700 font-bold bg-white rounded-full py-2 shadow-md">
          Danh sách tài khoản
        </button>
        <button className="flex-1 text-center text-gray-600 font-bold py-2">
          Hạn mức giao dịch
        </button>
      </div>

      {/* Payment Account */}
      <div className="bg-green-100 text-black p-4 mt-6 mx-4 rounded-lg">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection("payment")}
        >
          <h2 className="font-bold">Tài khoản thanh toán</h2>
          {openSections.payment ? (
            <IoIosArrowUp size={20} />
          ) : (
            <IoIosArrowDown size={20} />
          )}
        </div>
        {openSections.payment && (
          <div className="bg-white text-black p-4 mt-2 rounded-md">
            <p className="flex justify-between font-semibold mt-2">
              Tên Chủ Thẻ <span>{user?.fullName}</span>
            </p>
            <p className="flex justify-between font-semibold mt-2">
              Số tài Khoản <span>{user?.phoneNumber}</span>
            </p>
            <p className="flex justify-between text-blue-600 font-semibold mt-2">
              <span>Tổng số tiền VND</span>
              <span>{formatCurrency(balance)}</span>
            </p>
            <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded-md">
              + Mở tài khoản số đẹp
            </button>
          </div>
        )}
      </div>

      {/* Other Accounts */}
      {[
        { key: "saving", title: "Tài khoản tiết kiệm" },
        { key: "goal", title: "Tài khoản mục tiêu" },
        { key: "loan", title: "Tài khoản vay" },
      ].map(({ key, title }) => (
        <div
          key={key}
          className="bg-green-100 text-black p-4 mt-2 mx-4 rounded-lg cursor-pointer"
          onClick={() => toggleSection(key as keyof SectionState)}
        >
          <div className="flex justify-between items-center">
            <h2 className="font-bold">{title}</h2>
            {openSections[key as keyof SectionState] ? (
              <IoIosArrowUp size={20} />
            ) : (
              <IoIosArrowDown size={20} />
            )}
          </div>
          {openSections[key as keyof SectionState] && (
            <div className="bg-white text-black p-4 mt-2 rounded-md text-center">
              <p>Chức năng này đang phát triển...</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccountOverview;
