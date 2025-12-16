const Hero = () => {
  return (
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-28 bg-green-100 max-w-[2500px] mx-auto bg-[url(./background-soa.png)] bg-center bg-cover opacity-90">
          {/* Nội dung chữ bên trái */}
          <div className="text-center lg:text-left max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-gray-800 leading-tight">
                  Experience hassle-free banking
              </h2>
              <p className="text-gray-600 mt-6 text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                  Say goodbye to long queues and hello to hassle-free banking with Reen Bank.
              </p>
              <div className="mt-8 flex justify-center lg:justify-start space-x-4">
                  <button className="bg-green-500 text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 2xl:px-14 2xl:py-7 rounded-md text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl shadow-md transition-transform transform hover:scale-105">
                      Get Started
                  </button>
                  <button className="border border-green-500 text-green-600 px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 xl:px-12 xl:py-6 2xl:px-14 2xl:py-7 rounded-md text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl shadow-md transition-transform transform hover:scale-105">
                      Learn More →
                  </button>
              </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="mt-12 lg:mt-0 flex justify-center lg:justify-end w-full lg:w-1/2">
              <img
                  src="./image.png"
                  alt="Bank Cards"
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl drop-shadow-xl"
              />
          </div>
      </section>
  );
};

export default Hero;