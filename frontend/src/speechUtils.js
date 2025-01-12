import axios from 'axios';

export const speak = async (text, language) => {
    if ("speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        const voices = synth.getVoices();
        const selectedVoice = voices.find((voice) => voice.lang.startsWith(language));

        if (!selectedVoice) {
            console.error(`No voice found for language: ${language}`);
            return;
        }

        let translatedText = text;

        // If language is not English, translate it
        if (language !== 'en') {
            try {
                const response = await axios.get('https://api.mymemory.translated.net/get', {
                    params: {
                        q: text,
                        langpair: `en|${language}`, // Translate from English to the selected language
                    },
                });

                if (response.data && response.data.responseData) {
                    translatedText = response.data.responseData.translatedText;
                } else {
                    console.error('Translation failed');
                }
            } catch (error) {
                console.error('Error while translating text:', error);
            }
        }

        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.voice = selectedVoice;
        utterance.lang = language;

        synth.speak(utterance);
    } else {
        console.error("SpeechSynthesis API is not supported in this browser.");
    }
};
