import React from "react";

const FinanceServices: React.FC = () => {
  return (
    <section className="w-full flex flex-col items-center py-10">
      <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-6">
        Supported by various finance services
      </h2>
      <div className="flex flex-wrap justify-center gap-10 max-w-screen-3xl">
        <img
          src="./mastercard.png"
          alt="MasterCard"
          className="h-12 sm:h-16 md:h-20 lg:h-30"
        />
        <img
          src="./visa.png"
          alt="Visa"
          className="h-12 sm:h-16 md:h-20 lg:h-30"
        />
        <img
          src="./paypal.webp"
          alt="PayPal"
          className="h-12 sm:h-16 md:h-20 lg:h-30"
        />
        <img
          src="./payoneer.webp"
          alt="Payoneer"
          className="h-12 sm:h-16 md:h-20 lg:h-30"
        />
      </div>
    </section>
  );
};

export default FinanceServices;
