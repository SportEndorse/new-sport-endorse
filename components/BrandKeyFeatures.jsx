

"use client"
import '../styles/brandKeyFeatures.css';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function BrandKeyFeatures() {
  const { language } = useLanguage();
  const t = translations[language].components.brandKeyFeatures;
  
  const features = [
    {
      icon: "location-min.png",
      title: t.features[0].title,
      description: t.features[0].description,
    },
    {
      icon: "bullseye-min.png", 
      title: t.features[1].title,
      description: t.features[1].description,
    },
    {
      icon: "heart_icon-min.png",
      title: t.features[2].title,
      description: t.features[2].description,
    }
  ];

  return (
    <section className="brand-key-features">
      <div className="features-container">
        <h2>{t.title}</h2>
        <p>{t.subtitle}</p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                <img src={`/images/${feature.icon}`} alt={feature.title} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}