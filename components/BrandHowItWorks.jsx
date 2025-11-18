"use client"
import '../styles/brandHowItWorks.css';
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";

export default function BrandHowItWorks() {
    const { language } = useLanguage();
    const t = translations[language].components.brandHowItWorks;
    
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
        },
        {
        icon: "dollarsign-min.png",
        title: t.steps[3].title,
        number: "[04]",
        description: t.steps[3].description,
        }
    ];

  return (
    <section className='brand-how-bgGrid'>
        <div className="brand-how-it-works">
            <h2>{t.title}</h2>
            {/*<p className="brand-how-subtitle">
                {t.subtitle}
            </p>*/}
            <div className="brand-how-it-works-content">
                <div className="brand-how-steps-container">
                {steps.map((step, index) => (
                    <div className="brand-how-step-card" key={index}>
                    <div className="brand-how-step-header">
                        <span className="icon">
                            <img src={`/images/${step.icon}`} alt={step.title} className={`brand-how-step-icon brand-how-step-${index}`} />
                        </span>
                        <div className="brand-how-title-row">
                        <h3 className="brand-how-step-title">{step.title}</h3>
                        <span className="brand-how-step-number">{step.number}</span>
                        </div>
                    </div>
                    <hr className="brand-how-divider" />
                    <p className="brand-how-step-description">{step.description}</p>
                    </div>
                ))}
                </div>
                <a href={language === 'en' ? '/subscription' : `/${language}/subscription`} className="brand-how-start-link">
                    <button className="brand-how-start-button">{t.buttonText}</button>
                </a>
            </div>
        </div>
    </section>
  );
};


