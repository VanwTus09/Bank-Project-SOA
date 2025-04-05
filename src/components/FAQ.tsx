const FAQs = [
    { question: "How do I sign up for an account with Reen Bank?", answer: "Visit our website and complete the online application form." },
    { question: "What types of accounts does Reen Bank offer?", answer: "Savings, checking, business, and more." },
    { question: "Is Reen Bank FDIC insured?", answer: "Yes, all deposits are FDIC insured up to the legal limit." }
  ];
  
  const FAQ = () => {
    return (
      <section className="p-10 bg-green-50">
        <h2 className="text-3xl font-bold text-center">FAQs</h2>
        <div className="mt-6">
          {FAQs.map((faq, index) => (
            <div key={index} className="p-4 border-b">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FAQ;
  