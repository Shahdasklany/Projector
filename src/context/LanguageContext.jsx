import { createContext, useState } from "react";
import translations from "./translations";

export const LanguageContext = createContext();

function LanguageProvider({ children }) {

    const [language, setLanguage] = useState("en");

    const text = translations[language];

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                text
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageProvider;