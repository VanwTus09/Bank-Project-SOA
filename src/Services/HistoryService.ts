
const API_URL = "http://localhost:8080/api";

export const loginsavetime = async ( phoneNumber: string) => {
  try {
    const loginTime = new Date().toISOString()
    console.log(loginTime, "")
    const response = await fetch(`${API_URL}/loginhistory/loginlatest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, loginTime }),
    });

    return response.text()
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    throw err;
  }}