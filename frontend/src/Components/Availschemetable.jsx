import React from "react";

const Availschemetable = () => {
  const schemes = [
    {
      name: "Pradhan Mantri Awas Yojana",
      startDate: "01-06-2015",
      features: "Affordable housing for all.",
      ministry: "Ministry of Housing and Urban Affairs",
    },
    {
      name: "Digital India",
      startDate: "01-07-2015",
      features: "Promoting digital infrastructure and literacy.",
      ministry: "Ministry of Electronics and IT",
    },
    {
      name: "Swachh Bharat Mission",
      startDate: "02-10-2014",
      features: "Clean India initiative.",
      ministry: "Ministry of Drinking Water and Sanitation",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4 text-gray-800">Available Schemes</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Scheme Name</th>
            <th className="border border-gray-300 p-3 text-left">Start Date</th>
            <th className="border border-gray-300 p-3 text-left">Features</th>
            <th className="border border-gray-300 p-3 text-left">Govt Ministry</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{scheme.name}</td>
              <td className="border border-gray-300 p-3">{scheme.startDate}</td>
              <td className="border border-gray-300 p-3">{scheme.features}</td>
              <td className="border border-gray-300 p-3">{scheme.ministry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Availschemetable;
