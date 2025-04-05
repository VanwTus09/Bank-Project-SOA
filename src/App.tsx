import { Route, Routes } from "react-router-dom"
import "./index.css"
import Home from "./pages/Home"
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Overview from "./pages/Overview";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import ContactUs from "./pages/Contact";
import AccountOverview from "./pages/AccountOverview";
import LoginHistory from "./pages/LoginHistory";
import TransactionHistory from "./pages/TransactionHistory";
import Notification from "./pages/Nofitication";
import TransferSelect from "./pages/TransferSelect";
import TransferDetails from "./pages/TransferDetail";
function App() {
  return (
    <>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Overview" element={<Overview />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs/>} />
        <Route path="/Overview/Account" element={<AccountOverview/>} />
        <Route path="/Overview/LoginHistory" element={<LoginHistory/>} />
        <Route path="/Overview/TransactionHistory" element={<TransactionHistory/>} />
        <Route path="/Overview/Notification" element={<Notification/>} />
        <Route path="/Overview/TransferSelect" element={<TransferSelect/>} />
        <Route path="/Overview/TransferSelect/TransferDetail" element={<TransferDetails/>} />
      </Routes>
      <Footer />
    </AuthProvider>
    </>
  )
}

export default App
