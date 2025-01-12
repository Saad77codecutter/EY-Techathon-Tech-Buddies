import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css";
import schemes1 from '../assets/schemes1.png';

const Schemes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [schemes, setSchemes] = useState([]); // State to hold the fetched schemes
  const [filter, setFilter] = useState("All");

  // Function to fetch schemes based on search query
  const fetchSchemes = async (query) => {
    try {
      // Encode the query to handle special characters in the URL
      const encodedQuery = encodeURIComponent(query);
  
      // Send the GET request with the encoded query
      const response = await fetch(`http://localhost:3000/search?query=${encodedQuery}`);
  
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error('Failed to fetch schemes: ' + response.statusText);
      }
  
      // Parse the JSON response data
      const data = await response.json();
  
      // Update state with fetched schemes
      setSchemes(data);
    } catch (err) {
      console.error("Error fetching schemes:", err);
    }
  };

  useEffect(() => {
    // Fetch schemes initially (optional)
    fetchSchemes("");
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchSchemes(query); // Fetch schemes based on search query
  };

  const featuredSchemes = [
    { id: 101, name: "Featured Scheme 1", description: "Exclusive government benefits", category: "Government", image: schemes1, startDate: "2023-01-01", status: "Active" },
    { id: 102, name: "Featured Scheme 2", description: "Private sector opportunities", category: "Private", image: schemes1, startDate: "2022-06-15", status: "Active" },
    { id: 103, name: "Featured Scheme 3", description: "Educational scholarships", category: "Educational", image: schemes1, startDate: "2024-05-01", status: "Upcoming" },
    { id: 104, name: "Featured Scheme 4", description: "New opportunities for young entrepreneurs", category: "Government", image: schemes1, startDate: "2024-01-10", status: "Active" },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div style={{ padding: "10px" }}>
        <ul style={{ display: "flex", justifyContent: "center", listStyleType: "none" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: "#7CFF7C",
        }}
      />
    ),
  };

  return (
    
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <br />
      <br />
      <br />
      <br />
      {/* Sticky Search Bar Section with Animation */}
      <div className="sticky top-0 z-10 bg-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-white">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-full p-2 focus:ring-2 focus:ring-[#7CFF7C] outline-none"
          >
            <option value="All">All Schemes</option>
            <option value="State Scheme">Government Schemes</option>
            <option value="Central Scheme">Private Schemes</option>
          </select>

          <div className="flex items-center border border-gray-300 rounded-full p-2 w-full ml-4 hover: transition-transform duration-300 animate__animated animate__fadeIn animate__delay-1s">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch} // Handle search input change
              placeholder="Search for schemes"
              className="ml-2 bg-transparent outline-none w-full rounded-full px-6 py-2 focus:ring-2 focus:ring-[#7CFF7C] transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Animated Text Section */}
      <div className="text-center mt-4">
        <h2 className="text-4xl font-bold text-gray-800">
          <span className="animate__animated animate__fadeIn animate__delay-1s">Explore </span>
          <span className="animate__animated animate__fadeIn animate__delay-2s">Schemes</span>
        </h2>
      </div>

      {/* Featured Schemes Carousel with Animation */}
      <div className="bg-white rounded-xl max-w-[90%] shadow-lg p-6 mt-8 mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Schemes</h2>
        <Slider {...settings}>
          {featuredSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-[#F5F5F5] rounded-xl p-6 shadow-lg animate__animated animate__fadeIn animate__delay-1s">
              <div className="text-center">
                {/* Image for Featured Scheme */}
                <img src={scheme.image} alt={scheme.name} className="w-full h-auto object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{scheme.name}</h3>
                <p className="mt-2 text-gray-600">{scheme.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/scheme/${scheme.id}`)}
                    className="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Explore Available Schemes Table with Improved Design */}
{/* Explore Available Schemes Table with Improved Design */}
<div className="bg-white rounded-xl shadow-lg p-6 mt-8 overflow-x-auto">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore Available Schemes</h2>
  <table className="min-w-full bg-white table-auto border-collapse">
    <thead>
      <tr className="border-b border-gray-300">
        <th className="py-4 px-6 text-left text-gray-700 font-bold text-lg">Scheme Name</th>
        <th className="py-4 px-6 text-left text-gray-700 font-bold text-lg">Category</th>
        <th className="py-4 px-6 text-left text-gray-700 font-bold text-lg">Status</th>
        <th className="py-4 px-6 text-left text-gray-700 font-bold text-lg">Start Date</th>
      </tr>
    </thead>
    <tbody>
      {schemes.length > 0 ? (
        schemes.map((scheme) => (
          <tr
            key={scheme.id}
            className="hover:bg-[#f9f9f9] transition-colors duration-300"
          >
            <td className="py-4 px-6 text-blue-600 font-medium">
              <button
                onClick={() => navigate(`/scheme/${scheme.scheme_id}`)}
                className="hover:underline"
              >
                {scheme.scheme_name}
              </button>
            </td>
            <td className="py-4 px-6 text-gray-800">{scheme.scheme_category}</td>
            <td className="py-4 px-6 text-gray-800">{scheme.scheme_status}</td>
            <td className="py-4 px-6 text-gray-800">{scheme.start_date}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="py-4 px-6 text-center text-gray-800">
            No schemes found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Schemes;
