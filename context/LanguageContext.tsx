"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

export type Language = "en" | "es" | "de" | "fr";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectLanguageFromPath(pathname?: string): Language {
  const path = pathname || (typeof window !== "undefined" ? window.location.pathname : "");
  if (path.startsWith("/es")) return "es";
  if (path.startsWith("/de")) return "de";
  if (path.startsWith("/fr")) return "fr";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguage] = useState<Language>(() => detectLanguageFromPath(pathname));

  useEffect(() => {
    setLanguage(detectLanguageFromPath(pathname));
  }, [pathname]);

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