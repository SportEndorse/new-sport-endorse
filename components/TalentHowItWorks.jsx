"use client"
import '../styles/talentHowItWorks.css';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function TalentHowItWorks() {
  const { language } = useLanguage();
  const t = translations[language].components.talentHowItWorks;
  
  const steps = [
    {
      image: "031-min.png",
      title: t.steps[0].title,
      number: "[01]",
      description: t.steps[0].description
    },
    {
      image: "041.png", //04 
      title: t.steps[1].title,
      number: "[02]",
      description: t.steps[1].description
    },
    {
      image: "051.png", //05
      title: t.steps[2].title, 
      number: "[03]",
      description: t.steps[2].description
    },
    {
      image: "061.png",
      title: t.steps[3].title,
      number: "[04]", 
      description: t.steps[3].description
    }
  ];

  return (
    <section className='talent-how-it-works-bg'>
      <div className="talent-how-it-works">
        <h2>{t.title}</h2>
        <p className="subtitle">
          {t.subtitle}
        </p>
        <div className="talent-steps-container">
          {steps.map((step, index) => (
            <div className="talent-step-card" key={index}>
              <div className="talent-step-image">
                <img src={`/images/${step.image}`} alt={step.title} className="step-image" />
              </div>
              <div className="talent-step-content">
                <div className="talent-step-header">
                  <h3 className="talent-step-title">{step.title}</h3>
                  <span className="talent-step-number">{step.number}</span>
                </div>
                <hr className="talent-divider" />
                <p className="talent-step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <a target="_blank" href="https://platform.sportendorse.com/signup/talent" className="talent-start-link">
          <button className="talent-start-button">{t.buttonText}</button>
        </a>
      </div>
    </section>
  );
}
