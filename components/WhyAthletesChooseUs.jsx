"use client";
import "../styles/whyAthletesChooseUs.css";
import AppStores from "./AppStores";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function WhyAthletesChooseUs() {
  const { language } = useLanguage();
  const t = translations[language].components.whyAthletesChooseUs;
  
  return (
    <section className="why-athletes-section">
      <div className="why-athletes-container">
        <h2 className="why-athletes-title">{t.title}</h2>
        
        <div className="why-athletes-content">
          <div className="why-athletes-features">
            <div className="why-athletes-feature-item">
              <div className="why-athletes-feature-icon-container">
                <img src="/images/trophy-min.png" alt="dollar" className="why-athletes-feature-icon" />
              </div>
              <div className="why-athletes-feature-text">
                <h3 className="why-athletes-feature-title">
                  {t.features[0].title}
                </h3>
                <p className="why-athletes-feature-description">
                  {t.features[0].description}
                </p>
              </div>
            </div>

            <div className="why-athletes-feature-item">
              <div className="why-athletes-feature-icon-container">
                <img src="/images/heart_icon-min.png" alt="trophy" className="why-athletes-feature-icon" />
              </div>
              <div className="why-athletes-feature-text">
                <h3 className="why-athletes-feature-title">
                  {t.features[1].title}
                </h3>
                <p className="why-athletes-feature-description">
                  {t.features[1].description}
                </p>
              </div>
            </div>

            <div className="why-athletes-feature-item">
              <div className="why-athletes-feature-icon-container">
                <img src="/images/smartphone-min.png" alt="phone" className="why-athletes-feature-icon" /> {/* <a href="https://www.flaticon.com/free-icons/phone" title="phone icons">Phone icons created by Freepik - Flaticon</a> */}
              </div>
              <div className="why-athletes-feature-text">
                <h3 className="why-athletes-feature-title">
                  {t.features[2].title}
                </h3>
                <p className="why-athletes-feature-description">
                  {t.features[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="why-athletes-cta-section">
          <p className="why-athletes-cta-text">{t.ctaText}</p>
          <AppStores />
        </div>
      </div>
    </section>
  );
}
