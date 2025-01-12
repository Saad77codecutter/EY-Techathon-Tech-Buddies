import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/schemes/${id}`);
        setScheme(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching scheme details");
      }
    };

    fetchSchemeDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-6">{error}</div>;
  }

  if (!scheme) {
    return <div className="text-gray-500 text-center mt-6">Loading...</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <br /><br /><br />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details Section */}
        <div className="col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {scheme.scheme_name}
          </h2>
      
          <p className="text-lg text-gray-600 mb-6">{scheme.scheme_description}</p>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Eligibility Criteria:</h4>
            <p className="text-gray-600">{scheme.eligibility_criteria}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Benefits:</h4>
            <p className="text-gray-600">{scheme.benefits}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Funding Amount:</h4>
            <p className="text-gray-600">${scheme.funding_amount}</p>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Required Documents:</h4>
            <ul className="list-disc list-inside text-gray-600">
              {scheme.required_documents.split(",").map((doc, index) => (
                <li key={index}>{doc.trim()}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Category:</span>
              <span className="text-gray-600">{scheme.scheme_category}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Status:</span>
              <span className="text-gray-600">{scheme.scheme_status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">Start Date:</span>
              <span className="text-gray-600">{scheme.start_date}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-700">End Date:</span>
              <span className="text-gray-600">{scheme.end_date}</span>
            </div>
          </div>

          {/* Application Process */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700">Application Process:</h4>
            {scheme.application_process ? (
              <ul className="list-disc list-inside text-gray-600">
                {scheme.application_process.split(",").map((step, index) => (
                  <li key={index}>{step.trim()}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">Visit the following link to apply:</p>
            )}
            {scheme.scheme_URL && (
              <a
                href={scheme.scheme_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {scheme.scheme_URL}
              </a>
            )}
          </div>
        </div>

        {/* Analytics & Statistics Section */}
        <aside className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Analytics & Statistics
          </h3>
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Total Beneficiaries</h4>
            <div className="bg-[#F5F5F5] rounded-lg p-4">
              <p className="text-3xl font-bold text-gray-800">
                {scheme.number_of_beneficiaries}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Application Status</h4>
            <p className="text-gray-600">{scheme.application_status}</p>
          </div>
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-2">Category Analytics</h4>
          
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SchemeDetails;
