"use client"

import { useState } from 'react';
import { Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import "../styles/faqs.css"
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { brandFAQs, talentFAQs, agencyFAQs } from "../utils/faqData";

export default function FAQs(){
    const { language } = useLanguage();
    const t = translations[language].components.faqs;
    
    const [openCategories, setOpenCategories] = useState({});
    const [openItems, setOpenItems] = useState({});

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleItem = (category, index) => {
    const key = `${category}-${index}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Get FAQ data based on current language
  const currentBrandFAQs = brandFAQs[language] || brandFAQs.en;
  const currentTalentFAQs = talentFAQs[language] || talentFAQs.en;
  const currentAgencyFAQs = agencyFAQs[language] || agencyFAQs.en;

  return (
    <div className="faq-container">
      <div className="faq-content">
        <div className="faq-left-section">
          <h2 className="faq-title">{t.leftSection.title}</h2>
          
          {/*<div className="faq-questions-section">
            <div className="faq-avatars">
              <div className="faq-avatar"></div>
              <div className="faq-avatar"></div>
              <div className="faq-avatar"></div>
            </div>}
            <span className="faq-questions-text">{t.leftSection.questionsLeft}</span>
          </div>
          <p className="faq-description">
            {t.leftSection.description}
          </p>*/}
          
          {/*<a target="_blank" href="https://calendly.com/d/dzw-nc4-57b/sport-endorse-demo?month=2025-07">
            <button className="faq-schedule-button">
              {t.leftSection.scheduleButton}
              {/*<svg className="faq-schedule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17l10-10" />
              </svg>*}
            </button>
          </a>*/}
        </div>
        
        <div className="faq-right-section">
          <div className="faq-items-list">
            {[
              {
                name: t.categories.brand,
                key: 'brands',
                faqs: currentBrandFAQs,
                color: '#0078c1'
              },
              {
                name: t.categories.talent, 
                key: 'talent',
                faqs: currentTalentFAQs,
                color: '#10b981'
              },
              {
                name: t.categories.agency,
                key: 'agencies', 
                faqs: currentAgencyFAQs,
                color: '#f59e0b'
              }
            ].map((category) => (
              <div key={category.key} className="faq-category">
                <button 
                  onClick={() => toggleCategory(category.key)}
                  className="faq-category-button"
                  style={{ borderLeft: `4px solid ${category.color}` }}
                >
                  <span className="faq-category-text" style={{ color: category.color }}>{category.name}</span>
                  <div className="faq-category-icon">
                    {openCategories[category.key] ? (
                      <ChevronUp className="faq-icon" style={{ color: category.color }} />
                    ) : (
                      <ChevronDown className="faq-icon" style={{ color: category.color }} />
                    )}
                  </div>
                </button>
                
                {openCategories[category.key] && category.faqs.length > 0 && (
                  <div className="faq-category-content">
                    {category.faqs.map((item, index) => (
                      <div key={index} className="faq-item">
                        <button 
                          onClick={() => toggleItem(category.key, index)}
                          className="faq-item-button"
                        >
                          <h2 className="faq-item-text">{item.question}</h2>
                          <div className="faq-item-icon">
                            {openItems[`${category.key}-${index}`] ? (
                              <Minus className="faq-icon" />
                            ) : (
                              <Plus className="faq-icon" />
                            )}
                          </div>
                        </button>
                        
                        {openItems[`${category.key}-${index}`] && (
                          <div className="faq-item-content">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {openCategories[category.key] && category.faqs.length === 0 && (
                  <div className="faq-category-content">
                    <div className="faq-empty-message">
                      {t.emptyMessage}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
}