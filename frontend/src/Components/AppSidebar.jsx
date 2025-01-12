import { useState } from "react";
import { Home, Search, Clipboard, List ,User} from 'lucide-react';
import { Link } from "react-router-dom";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Scheme Elegibility Check", url: "/user", icon: Search },
  { title: "Explore Schemes", url: "/schemes", icon: Clipboard },
  { title: "Services", url: "/services", icon: List },
  //about us page
  { title: "About Us", url: "/about", icon: Home },
];

export default function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="relative">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50 transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r from-green-400 to-green-600 text-white z-50 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="navigation"
        aria-label="Main Sidebar"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Empowering Steps</h2>
          <button
            onClick={closeSidebar}
            className="text-white focus:outline-none"
            aria-label="Close Sidebar"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <ul className="space-y-4 p-4">
          {items.map((item) => (
            <li key={item.title}>
              <Link
                to={item.url}
                className="flex items-center space-x-3 p-2 rounded hover:bg-green-700 transition-all duration-200"
                onClick={closeSidebar}
              >
                <item.icon className="text-xl" />
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className={`p-4 text-gray-800 absolute top-0 left-4 z-50 focus:outline-none ${isSidebarOpen ? "hidden" : ""}`}
        aria-label="Open Sidebar"
      >
        <span className="text-3xl text-white">&#9776;</span>
      </button>

      {/* Main Content */}
      <main className="flex-1 p-8">{/* Add your main content here */}</main>
    </div>
  );
}
