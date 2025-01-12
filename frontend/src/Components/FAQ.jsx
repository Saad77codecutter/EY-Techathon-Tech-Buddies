import React, { useState } from 'react';

const FAQ = () => {
  // Defining categories with their respective FAQs
  const faqData = [
    {
      category: "General Information about Government Schemes",
      faqs: [
        {
          question: "What are Government Schemes?",
          answer:
            "Government schemes are initiatives launched by the Indian government to provide financial support, services, and assistance to citizens in various sectors such as healthcare, education, agriculture, housing, employment, and more. These schemes are designed to uplift the socio-economic conditions of the people, especially the marginalized communities.",
        },
        {
          question: "Can you tell me about government schemes?",
          answer:
            "Government schemes are structured programs aimed at addressing specific needs in areas like education, health, agriculture, employment, and social welfare. They provide support to various sections of society such as farmers, students, women, senior citizens, and differently-abled people.",
        },
        {
          question: "What kind of government schemes are available?",
          answer:
            "There are a wide variety of government schemes available for different sections of society, including schemes for healthcare, education, agriculture, housing, employment, women, children, senior citizens, and more.",
        },
        {
          question: "What is the purpose of government schemes?",
          answer:
            "The purpose of government schemes is to provide financial support and essential services to citizens, particularly to marginalized and underprivileged sections of society, ensuring social and economic empowerment.",
        },
      ],
    },
    {
      category: "Applying for Government Schemes",
      faqs: [
        {
          question: "How can I apply for a government scheme?",
          answer:
            "To apply for a government scheme, visit the official website, fill out the online application form, upload the required documents, and submit it for processing. Different schemes have different application processes, so check the guidelines of each scheme.",
        },
        {
          question: "What is the process to apply for government schemes?",
          answer:
            "The process generally includes visiting the official website of the scheme, filling out the application form, submitting necessary documents (such as Aadhaar, income proof, etc.), and waiting for approval or disbursement of benefits.",
        },
        {
          question: "Where can I apply for government schemes online?",
          answer:
            "You can apply for government schemes online through the official portals of the respective schemes, which can be accessed through government websites or specific state portals.",
        },
        {
          question: "How do I submit my application for a government scheme?",
          answer:
            "Once you've filled in your application form and uploaded the necessary documents, you can submit your application via the scheme’s portal by clicking the 'Submit' button. Ensure all fields are correctly filled out before submission.",
        },
      ],
    },
    // Add more categories as needed
  ];

  const [openCategoryIndex, setOpenCategoryIndex] = useState(null);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleCategory = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index);
  };

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h1>

      {faqData.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <div
            className="flex justify-between items-center cursor-pointer p-4 bg-gray-200 rounded-md"
            onClick={() => toggleCategory(categoryIndex)}
          >
            <span className="text-xl font-semibold">{category.category}</span>
            <span className="text-2xl">{openCategoryIndex === categoryIndex ? '-' : '+'}</span>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openCategoryIndex === categoryIndex ? 'max-h-[1000px]' : 'max-h-0'
            }`}
          >
            {category.faqs.map((faq, faqIndex) => (
              <div key={faqIndex} className="bg-white shadow-md rounded-md overflow-hidden mb-2">
                <div
                  className="flex justify-between items-center cursor-pointer p-2 border-b border-gray-500 hover:bg-gray-50"
                  onClick={() => toggleFAQ(faqIndex)}
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <span className="text-2xl">{openFAQIndex === faqIndex ? '-' : '+'}</span>
                </div>
                <div
                  className={`p-1 bg-gray-100 text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQIndex === faqIndex ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
