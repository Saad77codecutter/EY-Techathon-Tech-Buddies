import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import chatbot from '../assets/chatbot1.jpg';
import { useSelector } from 'react-redux';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { speak } from '@/speechUtils';

const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

    const answers = {
        "en": {
            "what are government schemes": "Government schemes are initiatives launched by the Indian government to provide financial support, services, and assistance to citizens in various sectors such as healthcare, education, agriculture, housing, employment, and more.",
            "how can i apply for a government scheme": "To apply for a government scheme, visit the official website of the scheme, fill out the online application form with necessary details, upload required documents like proof of identity, income, address, and submit the application.",
            "hello": "Hi there! How can I assist you with government schemes today?",
            "hi": "Hello! How can I help you with your queries about government schemes?",
            "sorry": "No worries! Let me know how I can assist you.",
            "thanks": "You're welcome! Let me know if you have more questions.",
            "thank you": "You're welcome! Feel free to ask anything else."
        },
        "hi": {
            "क्या हैं सरकारी योजनाएं": "सरकारी योजनाएं वे पहल हैं जो भारतीय सरकार द्वारा नागरिकों को विभिन्न क्षेत्रों जैसे स्वास्थ्य, शिक्षा, कृषि, आवास, रोजगार आदि में वित्तीय सहायता, सेवाएं और समर्थन प्रदान करने के लिए शुरू की जाती हैं।",
            "मैं सरकारी योजना के लिए आवेदन कैसे कर सकता हूं": "सरकारी योजना के लिए आवेदन करने के लिए, योजना की आधिकारिक वेबसाइट पर जाएं, आवश्यक विवरण के साथ ऑनलाइन आवेदन पत्र भरें, पहचान, आय, पता जैसे आवश्यक दस्तावेज़ अपलोड करें और आवेदन जमा करें।",
            "नमस्कार": "नमस्ते! मैं सरकारी योजनाओं के बारे में आपकी कैसे सहायता कर सकता हूँ?",
            "धन्यवाद": "आपका स्वागत है! अगर आपके पास और सवाल हैं तो मुझे बताएं।"
        }
    };

    const sendMessage = async () => {
        const newMessage = userInput.trim();
        if (!newMessage) return;

        setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: newMessage }]);

        const answer = answers[selectedLanguage]?.[newMessage.toLowerCase()];

        if (answer) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: answer }
            ]);
            speak(answer, selectedLanguage);
        } else {
            const fallbackMessage = "Sorry, I don't have an answer for that. Please try asking something else.";
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: fallbackMessage }
            ]);
            speak(fallbackMessage, selectedLanguage);
        }

        setUserInput('');
    };

    return (
        <div>
            {/* Chatbot Icon */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-5 right-5 z-50 bg-green-500 w-14 h-14 rounded-full text-white shadow-lg hover:bg-green-400 transition-colors duration-300"
            >
                <img src={chatbot} alt="Chatbot Icon" className="rounded-full" />
            </button>

            {/* Chatbot Overlay */}
            {isOpen && (
                <div className="flex justify-center items-center fixed top-28 right-5 w-[350px] md:w-[400px] lg:w-[450px] h-[80%] max-h-[80%] bg-opacity-30 z-50 transition-all duration-500 transform scale-110">
                    <div className="chat-container bg-white w-full h-full rounded-3xl shadow-2xl p-1 flex flex-col relative space-y-4 border-4 border-green-500 transition-all duration-500 ease-in-out">
                        {/* Header with colored background */}
                        <div className="flex items-center justify-between bg-green-500 text-white p-4 rounded-t-2xl">
                            <div className="flex items-center space-x-2">
                                <img src={chatbot} alt="Chatbot Avatar" className="w-10 h-10 rounded-full" />
                                <h2 className="text-xl font-semibold">Sayu-P AI CHATBOT</h2>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white text-xl hover:text-gray-200"
                            >
                                <IoArrowBack />
                            </button>
                        </div>

                        {/* Speaking Icon */}
                        {isSpeaking && (
                            <div className="absolute top-10 right-10 animate-pulse">
                                <FaMicrophoneAlt className="text-green-500 text-3xl" />
                            </div>
                        )}

                        {/* Message Container */}
                        <div className="flex-1 overflow-y-auto space-y-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`my-2 p-3 rounded-xl max-w-[80%] ${
                                        message.sender === 'user'
                                            ? 'bg-blue-500 text-white self-end ml-auto'
                                            : 'bg-gray-200 text-black self-start mr-auto'
                                    }`}
                                >
                                    {message.text}
                                </div>
                            ))}
                        </div>

                        {/* Input Box */}
                        <div className="flex items-center space-x-2 mt-4">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                                placeholder="Type your message..."
                            />
                            <button
                                onClick={sendMessage}
                                className="bg-green-500 text-white px-4 py-4 rounded-full hover:bg-green-400 transition"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
