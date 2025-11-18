"use client"
import '../styles/howItWorks.css';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function AgencyHowItWorks() {
    const { language } = useLanguage();
    const t = translations[language].components.agencyHowItWorks;
    
    const steps = [
        {
        icon: "testmessage-min.png",
        title: t.steps[0].title,
        number: "[01]",
        description: t.steps[0].description,
        },
        {
        icon: "volume-min.png",
        title: t.steps[1].title,
        number: "[02]",
        description: t.steps[1].description,
        },
        {
        icon: "startwithyellow-min.png",
        title: t.steps[2].title,
        number: "[03]",
        description: t.steps[2].description,
        }
    ];

  return (
    <section className='bgGrid'>
        <div className="how-it-works">
            <h2>{t.title}</h2>
            <p className="subtitle">
                {t.subtitle}
            </p>
            <div className="how-it-works-content">
                <div className="steps-container">
                {steps.map((step, index) => (
                    <div className="step-card" key={index}>
                    <div className="step-header">
                        <span className="icon">
                            <img src={`/images/${step.icon}`} alt={step.title} className={`step-icon step-${index}`} />
                        </span>
                        <div className="title-row">
                        <h3 className="step-title">{step.title}</h3>
                        <span className="step-number">{step.number}</span>
                        </div>
                    </div>
                    <hr className="divider" />
                    <p className="step-description">{step.description}</p>
                    </div>
                ))}
                </div>
                {/*<a target="_blank" href="https://platform.sportendorse.com/signup/brand" className="start-link">
                    <button className="start-button">{t.buttonText}</button>
                </a>*/}
            </div>
        </div>
    </section>
  );
};


