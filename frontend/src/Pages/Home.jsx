import React from 'react';
import about from '../assets/about.png';
import services from '../assets/services.png';
import vision from '../assets/vision.png';
import f1 from '../assets/chat.jpg';
import f2 from '../assets/f2.png';
import f3 from '../assets/f3.png';
import 'animate.css';
import FAQ from '@/Components/FAQ';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useSelector } from 'react-redux';
import head from '../assets/farmer.jpg';

const translations = {
  en: { welcome: 'Welcome!' },
  hi: { welcome: 'स्वागत है!' },
  mr: { welcome: 'स्वागत आहे!' },
};
const Home = () => {
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);
  const t = translations[selectedLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Main Content */}
      
      <div className="container mx-auto py-16 px-6">
        <br /><br />
        {/* Carousel Section */}
       

        {/* Welcome Heading */}
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16 drop-shadow-md animate-fade-in">
          Welcome to <span className="text-green-600">Empower 360</span>
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-14 space-x-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full md:w-1/2 lg:w-1/3 p-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-[#7CFF7C] transition"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl shadow-lg hover:from-green-500 hover:to-green-700 transition-transform transform hover:scale-105">
            Search
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-12">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-gray-200 hover:border-[#7CFF7C] transition-transform transform hover:scale-105">
            <img
              src={about}
              alt="About Us"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                About Us
              </h3>
              <p className="text-gray-600 mt-2">
                We, Tech Buddies, stand as a few college students with the scope to understand and solve the problems of citizens.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-gray-200 hover:border-[#7CFF7C] transition-transform transform hover:scale-105">
            <img
              src={services}
              alt="Our Services"
              className="w-full h-48  object-fill object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Our Services
              </h3>
              <p className="text-gray-600 mt-2">
                Discover a range of services designed with thorough decision-making to meet your needs and help you grow in your culture.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-gray-200 hover:border-[#7CFF7C] transition-transform transform hover:scale-105">
            <img
              src={vision}
              alt="Our Vision"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Our Vision
              </h3>
              <p className="text-gray-600 mt-2">
                Understand how we plan to shape the future and make a positive impact on society to make government schemes more effective for the needy.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 mt-20 drop-shadow-lg">
          Our Features
        </h2>

        <div className="space-y-12 w-[70%] mx-auto">
          {/* Feature 1 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-gray-200 hover:border-[#7CFF7C] transition-transform transform hover:scale-105">
            <img
              src={f1}
              alt="Feature 1"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Multilingual Voice Assistant-Integrated chatbot Sayu-P For Assisting form Filling and Navigation and FAQs
              </h3>
              <p className="text-gray-600 mt-2">
                Our website presents a Multilingual Voice Assistant Integrated chatbot Sayu-P. Sayu-P features full support to work in your native language and explain how to use our interface and fill scheme forms.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-gray-200 hover:border-[#7CFF7C] transition-transform transform hover:scale-105">
            <img
              src={f2}
              alt="Feature 2"
              className="w-full h-64 object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Automatic Data Scrapping
              </h3>
              <p className="text-gray-600 mt-2">
                Continuous data scraping to keep our database and scheme pool updated all the time just for you.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white border-2 border-gray-200 hover:border-[#7CFF7C] transition-transform transform hover:scale-105">
            <img
              src={f3}
              alt="Feature 3"
              className="w-full h-64  object-fill object-cover rounded-t-xl"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                Innovative Feedback Methods
              </h3>
              <p className="text-gray-600 mt-2">
                Discover new methods to provide offline support to users using kiosks.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12 drop-shadow-lg">
            Our Scheme Inclusions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div>
              <h3 className="text-4xl font-extrabold text-green-600">18+</h3>
              <p className="text-gray-600">Scheme Categories</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-green-600">100+</h3>
              <p className="text-gray-600">Schemes</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold text-green-600">10+</h3>
              <p className="text-gray-600">Scheme Eligibility criteria</p>
            </div>
            
          </div>
          
        </div>
        
      </div>
      <FAQ/>
      <footer className="bg-gray-800 text-white  mt-16 py-8 shadow-lg">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold">Empower 360</p>
          <p className="text-gray-400">© 2024 Tech Buddies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
