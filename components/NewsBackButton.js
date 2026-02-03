"use client"

import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";

export default function NewsBackButton() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleBack = () => {
    const path = window.location.pathname;
    if (path.startsWith('/es')) {
      window.location.href = '/es/presses';
    } else if (path.startsWith('/de')) {
      window.location.href = '/de/presses';
    } else if (path.startsWith('/fr')) {
      window.location.href = '/fr/presses';
    } else {
      window.location.href = '/presses';
    }
  };

  return (
    <button 
      className="back-button"
      onClick={handleBack}
    >
      <span className="back-button-icon">←</span>
      {t.common.back}
    </button>
  );
}