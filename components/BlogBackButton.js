"use client"

import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";

export default function BlogBackButton() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleBack = () => {
    const path = window.location.pathname;
    if (path.startsWith('/es')) {
      window.location.href = '/es/blog';
    } else if (path.startsWith('/de')) {
      window.location.href = '/de/blog';
    } else {
      window.location.href = '/blog';
    }
  };

  return (
    <button 
      className="back-button"
      onClick={handleBack}
    >
      <span className="back-button-icon">←</span>
      {t.common?.back || 'Back'}
    </button>
  );
}