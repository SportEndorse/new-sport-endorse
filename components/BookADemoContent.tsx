"use client";

import CalendlyDemo from "./CalendlyDemo";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/utils/translations";
import "../styles/bookADemo.css";

export default function BookADemoContent() {
  const { language } = useLanguage();
  const t = translations[language].components.bookADemo;

  return (
    <div className="book-a-demo-container">
      <div className="book-a-demo-content">
        <span className="book-a-demo-badge">{t.badge}</span>
        <h1 className="book-a-demo-title">{t.title}</h1>
        <p className="book-a-demo-description">{t.description}</p>
        <p className="book-a-demo-description">{t.description2}</p>
        <p className="book-a-demo-description">{t.description3}</p>
        <CalendlyDemo />
      </div>
    </div>
  );
}
