"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "es" | "de" | "fr";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLanguageFromPath(): Language {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/es")) return "es";
    if (path.startsWith("/de")) return "de";
    if (path.startsWith("/fr")) return "fr";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const detectedLanguage = detectLanguageFromPath();
    setLanguage(detectedLanguage);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}