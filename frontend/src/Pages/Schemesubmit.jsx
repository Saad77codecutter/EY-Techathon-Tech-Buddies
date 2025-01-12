import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Schemesubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ids } = location.state || {}; // Retrieve list of IDs from passed state
  const [schemes, setSchemes] = useState([]);
  const [notFoundIds, setNotFoundIds] = useState([]); // Track IDs not found in the database

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        if (ids && ids.length > 0) {
          const foundSchemes = [];
          const missingIds = [];

          await Promise.all(
            ids.map((id) =>
              axios
                .get(`http://localhost:3000/schemes/${id}`)
                .then((res) => foundSchemes.push(res.data))
                .catch((error) => {
                  console.error(`Error fetching scheme with ID ${id}:`, error);
                  missingIds.push(id);
                })
            )
          );

          setSchemes(foundSchemes);
          setNotFoundIds(missingIds); // Update the state with missing IDs
        }
      } catch (error) {
        console.error("Error fetching schemes:", error);
      }
    };

    fetchSchemes();
  }, [ids]);

  const handleSchemeClick = (id) => {
    navigate(`/scheme/${id}`);
  };

  const handleApplyClick = (name) => {
    navigate(`/apply/${name}`);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <br /><br /><br />
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Aside Section */}
          <aside className="bg-slate-50 p-6 rounded-xl shadow-lg md:col-span-1">
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Notes</h1>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              <li>Review all schemes carefully before applying.</li>
              <li>Ensure you meet the eligibility criteria for each scheme.</li>
              <li>Contact the respective ministry for further details.</li>
            </ul>
          </aside>

          {/* Main Section */}
          <div className="bg-slate-50 p-8 rounded-xl shadow-lg md:col-span-3">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Available Schemes
            </h1>
            {/* Table with Columns */}
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold">
                    Scheme Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold">
                    Start Date
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold">
                    Details
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold">
                    Apply Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {schemes.length > 0 ? (
                  schemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-green-100 transition">
                      <td className="px-4 py-2 border border-gray-300 text-green-600 font-medium">
                        <button
                          onClick={() => handleSchemeClick(scheme.scheme_id)}
                          className="text-green-600 hover:underline"
                        >
                          {scheme.scheme_name}
                        </button>
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-gray-700">
                        {scheme.start_date}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-gray-700">
                        {scheme.scheme_status}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-gray-700">
                        {scheme.scheme_description}
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <button
                          onClick={() => handleApplyClick(scheme.scheme_name)}
                          className="bg-green-600 text-white py-1 px-4 rounded-md hover:bg-green-500 transition"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-gray-500 py-4"
                    >
                      No schemes available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

        
          </div>
        </div>
      </div>
      <footer className="bg-gray-800 text-white mt-16 absolute w-full p-5 bottom-0 shadow-lg">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">Empower 360</p>
          <p className="text-gray-400">© 2024 Tech Buddies. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Schemesubmit;
