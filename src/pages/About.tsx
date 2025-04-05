const About = () => {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 xl:px-32 py-16">
        {/* Tiêu đề chính */}
        <h1 className="text-4xl font-bold text-center text-green-700 lg:text-7xl">About Reen Bank</h1>
        <p className="text-gray-600 text-center mt-4 text-lg max-w-2xl mx-auto lg:text-3xl">
          We are committed to providing a seamless and secure banking experience.
        </p>
  
        {/* Giới thiệu ngân hàng */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="./building.jpg"
            alt="Bank Building"
            className="rounded-lg shadow-lg w-full"
          />
          <div>
            <h2 className="text-3xl font-semibold text-green-600 lg:text-7xl">Our Mission</h2>
            <p className="text-gray-700 mt-4 text-lg lg:text-3xl">
              At Reen Bank, we prioritize customer satisfaction by offering innovative
              and reliable financial solutions. Our mission is to make banking
              effortless and secure for everyone.
            </p>
          </div>
        </div>
  
        {/* Giá trị cốt lõi */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-center text-green-600 lg:text-7xl">Our Core Values</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-md text-center">
              <h3 className="text-xl font-bold text-green-700">Trust</h3>
              <p className="text-gray-600 mt-2">Ensuring security and transparency in all transactions.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md text-center">
              <h3 className="text-xl font-bold text-green-700">Innovation</h3>
              <p className="text-gray-600 mt-2">Continuously improving banking technology for better services.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md text-center">
              <h3 className="text-xl font-bold text-green-700">Customer Focus</h3>
              <p className="text-gray-600 mt-2">Providing personalized and accessible financial solutions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default About;
  