import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-8 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* HELP Section */}
        <div>
          <h3 className="text-green-400 font-semibold mb-3">HELP</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">How to Use</a></li>
          </ul>
        </div>

        {/* ABOUT Section */}
        <div>
          <h3 className="text-green-400 font-semibold mb-3">ABOUT</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">About Reem Bank</a></li>
            <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-start">
          <h3 className="text-white text-lg font-semibold mb-2">New to Reem Bank?</h3>
          <p className="text-gray-400 mb-3">Enter your Email and Get Started Now</p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Enter your Email"
              className="flex-1 p-3 bg-gray-800 text-white rounded-l-md outline-none placeholder-gray-500"
            />
            <button className="bg-green-500 text-white px-4 py-3 rounded-r-md hover:bg-green-600">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-800 p-2 rounded">
            <span className="text-green-400 font-bold text-lg">rb</span>
          </div>
          <span className="text-white font-semibold">Reen Bank</span>
        </div>
        <p className="mt-3 md:mt-0">© 2023 ReenBank. All rights reserved!</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="#" className="text-green-400 hover:text-white"><FaFacebook size={20} /></a>
          <a href="#" className="text-green-400 hover:text-white"><FaInstagram size={20} /></a>
          <a href="#" className="text-green-400 hover:text-white"><FaTwitter size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
