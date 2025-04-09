import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Contact, OtherbankItem } from "../Services/AuthService";


const banksIn = ["Ngân hàng Reen bank"];
const banksOut = ["Bank A", "Bank B", "Bank C"];

const TransferSelect = () => {
  const [bank, setBank] = useState(banksIn[0]);
  const [account, setAccount] = useState("");
  const [isInBank, setIsInBank] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();

  const userAccount = localStorage.getItem("phoneNumber");

  useEffect(() => {
    fetch("http://localhost:8080/api/contacts")
      .then((res) => {
        if (!res.ok) throw new Error("Lỗi khi gọi API");
        return res.json();
      })
      .then((data: Contact[]) => setContacts(data))
      .catch((error) => console.error("Lỗi khi lấy danh bạ:", error));
  }, []);

  const checkAccountGreenBank = async (phoneNumber: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/bankaccounts/search?phoneNumber=${phoneNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) throw new Error("Không thể kiểm tra tài khoản Reenbank");
      const data = await response.json();
      return data !== null;
    } catch (error) {
      console.error("Lỗi khi kiểm tra tài khoản Reenbank:", error);
      return false;
    }
  };

  const fetchAllOutsideAccounts = async (): Promise<OtherbankItem[]> => {
    try {
      const response = await fetch("http://localhost:8080/api/otherbankaccounts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Không thể lấy danh sách tài khoản ngoài ngân hàng");
        return [];
      }

      const data: OtherbankItem[] = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Lỗi khi fetch tài khoản ngoài ngân hàng:", error);
      return [];
    }
  };

  const checkAccountOutsideBank = async (account: string, bankName: string): Promise<OtherbankItem | null> => {
    const allAccounts = await fetchAllOutsideAccounts();
    const matched = allAccounts.find(
      (acc) => acc.contactAccount.toString === account.toString && acc.bankName === bankName
    );
    return matched ?? null;
  };

  const isBankInSystem = (name: string) =>
    banksIn.some((b) => b.trim().toLowerCase() === name.trim().toLowerCase());

  const handleCheck = async () => {
    if (!account) {
      alert("Vui lòng nhập số tài khoản");
      return;
    }

    if (account === userAccount) {
      alert("Không thể chuyển tiền cho chính tài khoản của bạn.");
      return;
    }

    if (isBankInSystem(bank)) {
      const valid = await checkAccountGreenBank(account);
      if (!valid) {
        alert("Tài khoản không tồn tại trong ReenBank.");
        return;
      }

      navigate("TransferDetail", { state: { bank, account } });
    } else {
      const result = await checkAccountOutsideBank(account, bank);  
      if (!result) {
        alert("Tài khoản không tồn tại ở ngân hàng ngoài.");
        return;
      }

      navigate("TransferDetail", {
        state: {
          bank,
          account,
          name: result.fullName,
        },
      });
    }
  };

  const handleSelectSaved = (contact: Contact) => {
    navigate("TransferDetail", {
      state: {
        bank: contact.bankName,
        account: contact.contactAccount,
        name: contact.contactName,
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Chuyển tiền</h1>

      <div className="mt-4">
        <label className="block mb-2">Chọn ngân hàng</label>
        <div className="flex mb-4">
          <button
            className={`px-4 py-2 mr-2 ${isInBank ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => {
              setIsInBank(true);
              setBank(banksIn[0]);
            }}
          >
            Trong ngân hàng
          </button>
          <button
            className={`px-4 py-2 ${!isInBank ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => {
              setIsInBank(false);
              setBank(banksOut[0]);
            }}
          >
            Ngoài ngân hàng
          </button>
        </div>

        <select
          className="border p-3 w-full"
          value={bank}
          onChange={(e) => {
            const selected = e.target.value;
            setBank(selected);
            setIsInBank(isBankInSystem(selected));
          }}
        >
          {(isInBank ? banksIn : banksOut).map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label className="block mb-2">Số tài khoản người nhận</label>
        <input
          type="text"
          className="border p-3 w-full"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>

      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white px-6 py-3 mt-4"
      >
        Xác nhận
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Người thụ hưởng đã lưu</h2>
        <ul className="space-y-3">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="p-4 border rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSaved(contact)}
            >
              <p className="font-medium">{contact.contactName}</p>
              <p className="text-sm text-gray-600">
                {contact.bankName} - {contact.contactAccount}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransferSelect;
