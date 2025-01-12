import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const VoiceAssistant = ({ messageToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Fetch the selected language from Redux state
  const selectedLanguage = useSelector((state) => state.language.selectedLanguage);

  // Function to handle speech synthesis
  const speak = (text, language) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const selectedVoice = voices.find((voice) => voice.lang.startsWith(language));

      if (!selectedVoice) {
        console.error(`No voice found for language: ${language}`);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.lang = language;
      synth.speak(utterance);

      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    } else {
      console.error("SpeechSynthesis API is not supported in this browser.");
    }
  };

  // Function to translate the text
  const translateText = async (text, targetLanguage, sourceLanguage = "en") => {
    try {
      const response = await axios.post("https://libretranslate.com/translate", {
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: "text",
      });
      return response.data.translatedText;
    } catch (error) {
      console.error("Error during translation:", error);
      return text; // Return original text if translation fails
    }
  };

  // Use effect to handle speaking the chatbot message
  useEffect(() => {
    if (messageToSpeak) {
      const handleSpeak = async () => {
        try {
          // Translate message to the selected language
          const translatedMessage =
            selectedLanguage !== "en"
              ? await translateText(messageToSpeak, selectedLanguage.slice(0, 2))
              : messageToSpeak;

          // Speak the translated message
          speak(translatedMessage, selectedLanguage);
        } catch (error) {
          console.error("Error processing message to speak:", error);
        }
      };

      handleSpeak();
    }
  }, [messageToSpeak, selectedLanguage]);

  return (
    <div>
      {/* Voice Assistant Icon */}
      <div
        className={`voice-assistant-icon ${isSpeaking ? "speaking" : ""}`}
        style={{
          width: "15%",
          bottom: "20px",
          right: "100px",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          padding: "15px",
          borderRadius: "50%",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          color: "white",
        }}
      >
        <FaRobot />
      </div>
    </div>
  );
};

export default VoiceAssistant;
