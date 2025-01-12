import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaMailBulk, FaCalendarAlt, FaSchool, FaTransgender,FaBriefcase,FaFileAlt,FaStarOfLife } from "react-icons/fa";
import { MdOutlineWork, MdOutlineLocationCity } from "react-icons/md";

import { speak } from "@/speechUtils";
import { useSelector } from "react-redux";

const statesAndDistricts = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Thane", "Solapur"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli", "Belagavi", "Ballari", "Shimoga", "Davangere"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota", "Bikaner", "Alwar", "Bharatpur"],
  UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Allahabad", "Noida", "Ghaziabad"],
  TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Tirunelveli", "Vellore"],
  WestBengal: ["Kolkata", "Howrah", "Darjeeling", "Siliguri", "Durgapur", "Asansol", "Bardhaman", "Kharagpur"],
  MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna", "Rewa"],
  AndhraPradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Rajahmundry", "Kadapa"],
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar", "Adilabad", "Siddipet"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kannur", "Kollam", "Alappuzha", "Palakkad"],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Ara", "Begusarai"],
  Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Pathankot"],
  Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Hisar", "Rohtak", "Karnal", "Sonipat"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur", "Tinsukia", "Nagaon", "Goalpara"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Berhampur", "Sambalpur", "Balasore", "Baripada"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh"],
  Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Raigarh"],
  HimachalPradesh: ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Chamba", "Una"],
  Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Almora", "Haldwani", "Rudrapur", "Roorkee"],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Canacona", "Curchorem"],
};

const UserForm = () => {

  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const [formData, setFormData] = useState({
    id:"00000",
    phoneNumber: "",
    age: "",
    email: "",
    state: "",
    district: "",
    Region:"",
    Scheme_Category:"",
    employed:"",
    occupation: "",
    education: "",
    gender: "",
    dateOfBirth: "",
    seniorCitizen: 0,
    is_farmer:0,
   
   
  });

  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      setDistricts(statesAndDistricts[value] || []);
    }

    if (name === "dateOfBirth") {
      const age = calculateAge(value);
      setFormData((prev) => ({ ...prev, seniorCitizen: age >= 60 ? 1 : 0 })); // Set 1 if age >= 60, otherwise 0
    }
    
    if (name === "occupation") {
      if (value === "Farmer") {
        setFormData((prev) => ({ ...prev, is_farmer: 1 })); // Set is_farmer to 1 if occupation is farmer
      } else {
        setFormData((prev) => {
          const updatedData = { ...prev };
          updatedData.is_farmer = 0; // Set is_farmer to 0 if occupation is not farmer
          return updatedData;
        });
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (  !formData.state || !formData.district) {
      setError("Please fill in all the required fields.");
      speak("Please fill in all the required fields.",selectedLanguage);
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError("Please enter a valid 10-digit phone number.");
      speak("Please enter a valid 10-digit phone number.",selectedLanguage);
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      speak("Please enter a valid email address.",selectedLanguage);
      return;
    }
    delete formData.fullName
    try {
      const response = await fetch("http://localhost:5001/predict-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.eligibility);
        navigate("/availscheme", { state: { ids:data.eligibility } });
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        <aside className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md col-span-1">
          <h3 className="text-lg font-semibold text-blue-600">Important Notice</h3>
          <ul className="list-disc list-inside mt-4 text-sm text-blue-800 space-y-2">
            <li>Ensure all fields marked as required are filled correctly.</li>
            <li>Use a valid email address to avoid registration issues.</li>
            <li>Phone numbers must be 10 digits long.</li>
            <li>Date of Birth will determine senior citizen status.</li>
            <li>Contact support for any technical issues.</li>
          </ul>
        </aside>

        <div className="bg-white shadow-md p-8 rounded-lg col-span-2">
          <h2 className="text-center font-semibold text-2xl text-gray-800 mb-6">User Registration Form</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Map through input fields */}
              {[
                { name: "fullName", label: "Full Name", type: "text", icon: <FaUser /> },
                { name: "phoneNumber", label: "Phone Number", type: "text", icon: <FaPhone /> },
                //for age 
                { name: "age", label: "Age", type: "number", icon: <FaStarOfLife/>},
                { name: "email", label: "Email", type: "email", icon: <FaMailBulk /> },

                { name: "state", label: "State", type: "select", options: Object.keys(statesAndDistricts).map((state) => ({ value: state, label: state })), icon: <MdOutlineLocationCity /> },
                
                { name: "district", label: "District", type: "select", options: districts.map((district) => ({ value: district, label: district })), icon: <MdOutlineLocationCity /> },
                { 
                  name: "Region", 
                  label: "Region", 
                  type: "select", 
                  options: [
                    { value: "Urban", label: "Urban" },
                    { value: "Rural", label: "Rural" },
                  ], 
                  icon: <MdOutlineLocationCity /> 
                },
                
                {
                  name: "Scheme_Category",
                  label: "Scheme Category",
                  type: "select",
                  options: [
                    { value: "Agriculture, Rural & Environment", label: "Agriculture, Rural & Environment" },
                    { value: "Banking, Financial Services and Insurance", label: "Banking, Financial Services and Insurance" },
                    { value: "Business & Entrepreneurship", label: "Business & Entrepreneurship " },
                    { value: "Education & Learning", label: "Education & Learning " },
                    { value: "Health & Wellness", label: "Health & Wellness " },
                    { value: "Housing & Shelter", label: "Housing & Shelter" },
                    { value: "Public Safety, Law & Justice", label: "Public Safety, Law & Justice " },
                    { value: "Science, IT & Communications", label: "Science, IT & Communications" },
                    { value: "Skills & Employment", label: "Skills & Employment" },
                    { value: "social-welfare", label: "Social welfare & Empowerment" },
                    { value: "Sports & Culture", label: "Sports & Culture" },
                    { value: "Transport & Infrastructure", label: "Transport & Infrastructure" },
                    { value: "Travel & Tourism", label: "Travel & Tourism " },
                    { value: "Utility & Sanitation", label: "Utility & Sanitation " },
                    { value: "Women and Child", label: "Women and Child " }
                  ],
                  icon:<FaBriefcase/>
                },
                { name: "employed",label: "Employed", type: "select", options:[{ value:1, label: "Yes"},{value:0,label:"No"}],icon:<FaFileAlt/>},
                {
                  name: "occupation",
                  label: "Occupation",
                  type: "select",
                  options: [
                    { value: "Farmer", label: "farmer" },
                  
                    { value: "Government Employee", label: "Government Employee" },
                    { value: "private-employee", label: "Private Employee" },
                    { value: "business", label: "Business Owner" },
                    { value: "freelancer", label: "Freelancer" },
                    { value: "self-employed", label: "Self-Employed" },
                    { value: "unemployed", label: "Unemployed" },
                    { value: "retired", label: "Retired" },
                    { value: "homemaker", label: "Homemaker" },
                  ],
                  icon: <MdOutlineWork />,
                },
                { name: "education", label: "Education", type: "select" ,options:[{value:"Diploma",label:"Diploma"},{value:"high school",label:"high school"},{value:"Graduate",label:"Graduate"},{value:"Post Graduate",label:"Post Graduate"}], icon: <FaSchool /> },
                { name: "gender", label: "Gender", type: "select", options: [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }], icon: <FaTransgender /> },
                { name: "dateOfBirth", label: "Date of Birth", type: "date", icon: <FaCalendarAlt /> },
              ].map(({ name, label, type, options, icon }) => (
                <label key={name} className="flex flex-col relative">
                  <span className="text-gray-700 font-medium">{label}</span>
                  <div className="flex items-center">
                    <span className="absolute left-2 text-gray-500">{icon}</span>
                    {type === "select" ? (
                      <select
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none w-full transition-all"
                      >
                        <option value="">Select {label}</option>
                        {options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={name}
                        placeholder={`Enter your ${label.toLowerCase()}`}
                        value={formData[name]}
                        onChange={handleChange}
                        className="pl-10 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none w-full transition-all"
                      />
                    )}
                  </div>
                </label>
              ))}
              {/* Display Senior Citizen Status */}
              <label className="flex flex-col relative">
                <span className="text-gray-700 font-medium">Senior Citizen Status</span>
                <input
                  type="text"
                  readOnly
                  value={formData.seniorCitizen ? "Yes" : "No"}
                  className="border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />

                
              </label>

              <label className="flex flex-col relative">
                <span className="text-gray-700 font-medium">Are you a Farmer?</span>
                <input
                  type="text"
                  readOnly
                  value={formData.is_farmer==1 ? "Yes" : "No"}
                  className="border border-gray-300 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />

                
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-all">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
