import { PiggyBank, CreditCard, FileText, Briefcase, Wallet, DollarSign } from "lucide-react";

const services = [
  { 
    title: "Savings accounts", 
    desc: "Reen Bank could offer a variety of savings accounts with different interest rates and terms, allowing customers to save money and earn interest over time. These accounts could include features like automatic transfers, overdraft protection, and mobile banking access.", 
    icon: PiggyBank 
  },
  { 
    title: "Personal loans", 
    desc: "Reen Bank could offer personal loans for a variety of purposes, such as debt consolidation, home improvements, or major purchases. Customers could apply online and receive a decision quickly, with flexible repayment terms and competitive interest rates.", 
    icon: FileText 
  },
  { 
    title: "Credit cards", 
    desc: "Reen Bank could offer credit cards with different rewards programs and benefits, such as cash back, travel rewards, or low-interest rates. Customers could manage their cards online and receive alerts for suspicious activity or due dates.", 
    icon: CreditCard 
  },
  { 
    title: "Investment services", 
    desc: "Reen Bank could offer investment services for customers looking to grow their wealth over time. These services could include mutual funds, exchange-traded funds, and other investment vehicles, with access to professional financial advice and analysis.", 
    icon: Wallet 
  },
  { 
    title: "Online bill pay", 
    desc: "Reen Bank could offer a convenient online bill pay service, allowing customers to pay bills and manage expenses from their computer or mobile device. This service could include features like automatic payments, bill reminders, and customizable payment schedules.", 
    icon: DollarSign 
  },
  { 
    title: "Business banking", 
    desc: "Reen Bank could offer a range of banking services for small and medium-sized businesses, including checking accounts, business loans, merchant services, and cash management tools. These services could help businesses streamline their financial operations and grow their operations over time.", 
    icon: Briefcase 
  }
];

const Services = () => {
  return (
    <section className="p-10 max-w-9xl mx-auto">
      <h2 className="text-6xl font-bold text-center mb-16">Services</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-16">
        {services.map((service, index) => (
          <div key={index} className="flex items-start space-x-6 p-10 bg-white shadow-2xl rounded-2xl transition-transform transform hover:scale-105">
            <service.icon className="w-20 h-20 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="text-3xl font-semibold text-green-600">{service.title}</h3>
              <p className="text-gray-600 mt-4 leading-relaxed text-xl">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;