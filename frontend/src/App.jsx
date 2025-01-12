import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navi from './Components/navi';  // Import the Navi component
import AppSidebar from './Components/AppSidebar';  // Import the sidebar (optional, if you want a fixed sidebar)
import './App.css';
import UserDetails from './Pages/UserDetails';
import Home from './Pages/Home';
import Schemesubmit from './Pages/Schemesubmit';
import Schemes from './Pages/Schemes';
import SchemeDetails from './Pages/SchemeDetails';
import VoiceAssistant from './Components/VoiceAssistant';

import Aboutus from './Pages/Aboutus';
import Apply from './Pages/Apply';
import Chatbot from './Components/Chatbot';




function App() {
  return (
    <Router>
      <div>
        {/* Navbar or Sidebar */}
        <Navi />
      

        {/* Main Content */}
        <div >
       <Chatbot/>
        {/* Add your voice assistant component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<UserDetails />} />
            <Route path='/availscheme' element={<Schemesubmit />} />
            <Route path='/schemes' element={<Schemes />} />
            <Route path='/scheme/:id' element={<SchemeDetails />} />
            <Route path='/about' element={<Aboutus />} />  {/* Add your route for the aboutus page */}
            <Route path='/apply/:scheme_name' element={<Apply />} /> {/* Add your route for the apply page */}
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
