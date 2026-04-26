import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../utils/i18n";

// Create the context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to "en"
    return localStorage.getItem("language") || "en";
  });

  // Update document direction and lang attribute when language changes
  useEffect(() => {
    localStorage.setItem("language", language);

    // Set RTL for Arabic
    const htmlElement = document.documentElement;
    if (language === "ar") {
      htmlElement.setAttribute("dir", "rtl");
      htmlElement.setAttribute("lang", "ar");
    } else {
      htmlElement.setAttribute("dir", "ltr");
      htmlElement.setAttribute("lang", language);
    }
  }, [language]);

  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    switchLanguage,
    t: translations[language] || translations.en,
    languages: Object.keys(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
