"use client"

import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";

export default function PodcastBackButton() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleBack = () => {
    const path = window.location.pathname;
    if (path.startsWith('/es')) {
      window.location.href = '/es/podcasts';
    } else if (path.startsWith('/de')) {
      window.location.href = '/de/podcasts';
    } else if (path.startsWith('/fr')) {
    window.location.href = '/fr/podcasts';
    } else {
      window.location.href = '/podcasts';
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