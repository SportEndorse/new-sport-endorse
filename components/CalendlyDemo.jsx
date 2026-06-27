"use client"
import { useEffect } from "react";
import "../styles/calendly.css";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function CalendlyDemo({ agencies = false }) {
  const { language } = useLanguage();
  const tDemo = translations[language].components.calendlyDemo;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="calendly-demo-section">
      <div
        className="meetings-iframe-container"
        data-src="https://meetings.hubspot.com/alicia269/sport-endorse-demo?embed=true"
      />

      {/*<div className="calendly-demo-container">
        <div className="calendly-demo-header">
          <h3 className="calendly-demo-title">{tDemo.title}</h3>
        </div>

        <div className="calendly-demo-content">
          <div className="calendly-demo-image">
            <img src="/images/calendar image.webp" alt="Calendar demo" className="calendar-image" />
          </div>

          <div className="calendly-demo-right">
            <p className="calendly-demo-description">
              {agencies ? tDemo.agencyDescription : tDemo.description}
            </p>
            <div className="calendly-demo-button">
              <a target="_blank" href="https://meetings.hubspot.com/alicia269/sport-endorse-demo?embed=true">
                <button className="agenecy-demo-btn">
                  {agencies ? tDemo.agencyButtonText : tDemo.buttonText}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>*/}
    </div>
  );
}
