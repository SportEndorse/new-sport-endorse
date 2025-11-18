"use client";
import React from "react";
import "../styles/businessSubscription.css";
import { useLanguage } from "../context/LanguageContext";
import translations from "../utils/translations";
import { useState, useEffect } from "react";

interface BusinessSubscriptionProps {
  titleLevel?: 'h1' | 'h2';
  shortened?: boolean;
}

export default function BusinessSubscription({ titleLevel = 'h2', shortened = false }: BusinessSubscriptionProps) {
  const { language } = useLanguage();
  const t = translations[language].components.businessSubscription;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load HubSpot script when component mounts
    if (!document.querySelector('script[src="https://js.hsforms.net/forms/embed/4025606.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.hsforms.net/forms/embed/4025606.js';
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const featureCategories = [
    {
      category: t.categories.talentDiscovery,
      features: [
        { name: t.features.accessToPlatform, trial: true, quarterly: true, annual: true },
        { name: t.features.advancedSearchTools, trial: true, quarterly: true, annual: true },
        { name: t.features.verifiedTalentProfiles, trial: true, quarterly: true, annual: true }
      ]
    },
    {
      category: t.categories.communication,
      features: [
        { name: t.features.directMessaging, trial: true, quarterly: true, annual: true }
      ]
    },
    {
      category: t.categories.campaignManagement,
      features: [
        { name: t.features.postOpportunities, trial: false, quarterly: true, annual: true }
      ]
    },
    {
      category: t.categories.growthScale,
      features: [
        { name: t.features.unlimitedProfiles, trial: false, quarterly: true, annual: true },
        { name: t.features.targetUnlimitedMarkets, trial: false, quarterly: true, annual: true }
      ]
    },
    {
      category: t.categories.supportSuccess,
      features: [
        { name: t.features.dedicatedOnboarding, trial: true, quarterly: true, annual: true },
        { name: t.features.customerSuccessManager, trial: false, quarterly: false, annual: true }
      ]
    }
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className="subscription-container">
        <div className="subscription-header">
          {titleLevel === 'h1' ? (
            <h1 className="subscription-title">{t.mainTitle}</h1>
          ) : (
            <h2 className="subscription-title">{t.mainTitle}</h2>
          )}
          <p className="subscription-subtitle">{t.mainSubtitle}</p>
        </div>

        {shortened ? (
          /* Shortened Version - Table Layout without Features */
          <div className="subscription-table-wrapper">
            <table className="subscription-table">
              <thead>
                <tr>
                  <th className="subscription-table-title-cell">{t.sectionTitle}</th>
                  <th className="subscription-plan-header trial-plan">
                    <div className="subscription-plan-name">{t.plans.freeTrial}</div>
                    <div className="subscription-plan-price">
                      <span className="currency">€/£/$</span>0<span className="period">/month</span>
                    </div>
                    <div className="subscription-billing-info">{t.billing.freeTrialInfo}</div>
                  </th>
                  <th className="subscription-plan-header quarterly-plan">
                    <div className="subscription-plan-name">{t.plans.quarterlyRate}</div>
                    <div className="subscription-plan-price">
                      <span className="currency">€/£/$</span>700<span className="period">/quarter</span>
                    </div>
                    <div className="subscription-billing-info">{t.billing.quarterlyInfo}</div>
                  </th>
                  <th className="subscription-plan-header annual-plan">
                    <div className="subscription-plan-name">{t.plans.annualRate}</div>
                    <div className="subscription-plan-price">
                      <span className="currency">€/£/$</span>1,799<span className="period">/year</span>
                    </div>
                    <div className="subscription-billing-info">{t.billing.annualInfo}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="subscription-cta-row">
                  <td><strong>{t.buttons.getStarted}</strong></td>
                  <td>
                    <a href={`${language === 'en' ? '' : `/${language}`}/subscription`} className="subscription-cta-button subscription-trial-button">
                      {t.buttons.seeMore}
                    </a>
                  </td>
                  <td>
                    <a href={`${language === 'en' ? '' : `/${language}`}/subscription`} className="subscription-cta-button subscription-quarterly-button">
                      {t.buttons.seeMore}
                    </a>
                  </td>
                  <td>
                    <a href={`${language === 'en' ? '' : `/${language}`}/subscription`} className="subscription-cta-button subscription-annual-button">
                      {t.buttons.seeMore}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          /* Full Version - Pivot Table for Standard Subscriptions */
          <div className="subscription-table-wrapper">
            <table className="subscription-table">
              <thead>
                <tr>
                  <th className="subscription-table-title-cell">{t.sectionTitle}</th>
                  <th className="subscription-plan-header trial-plan">
                    <div className="subscription-plan-name">{t.plans.freeTrial}</div>
                    <div className="subscription-plan-price">
                      <span className="currency">€/£/$</span>0<span className="period">/month</span>
                    </div>
                    <div className="subscription-billing-info">{t.billing.freeTrialInfo}</div>
                  </th>
                  <th className="subscription-plan-header quarterly-plan">
                    <div className="subscription-plan-name">{t.plans.quarterlyRate}</div>
                    <div className="subscription-plan-price">
                      <span className="currency">€/£/$</span>700<span className="period">/quarter</span>
                    </div>
                    <div className="subscription-billing-info">{t.billing.quarterlyInfo}</div>
                  </th>
                  <th className="subscription-plan-header annual-plan">
                    <div className="subscription-plan-name">{t.plans.annualRate}</div>
                    <div className="subscription-plan-price">
                      <span className="currency">€/£/$</span>1,799<span className="period">/year</span>
                    </div>
                    <div className="subscription-billing-info">{t.billing.annualInfo}</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="subscription-category-row">
                      <td className="subscription-category-header" colSpan={4}>
                        {category.category}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={featureIndex} className="subscription-feature-row">
                        <td>{feature.name}</td>
                        <td>
                          {feature.trial ? (
                            <svg className="subscription-check-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="subscription-x-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </td>
                        <td>
                          {feature.quarterly ? (
                            <svg className="subscription-check-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="subscription-x-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </td>
                        <td>
                          {feature.annual ? (
                            <svg className="subscription-check-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="subscription-x-icon" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                <tr className="subscription-cta-row">
                  <td><strong>{t.buttons.getStarted}</strong></td>
                  <td>
                    <a href="https://platform.sportendorse.com/signup/brand?subscription=trial" target="_blank" rel="noopener noreferrer" className="subscription-cta-button subscription-trial-button">
                      {t.buttons.startFreeTrial}
                    </a>
                  </td>
                  <td>
                    <a href="https://platform.sportendorse.com/signup/brand?subscription=quarterly" target="_blank" rel="noopener noreferrer" className="subscription-cta-button subscription-quarterly-button">
                      {t.buttons.subscribeNow}
                    </a>
                  </td>
                  <td>
                    <a href="https://platform.sportendorse.com/signup/brand?subscription=annual" target="_blank" rel="noopener noreferrer" className="subscription-cta-button subscription-annual-button">
                      {t.buttons.save35}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Custom Package Section */}
        <div className="subscription-custom-section">
          <h3 className="subscription-custom-title">{t.customPackage.title}</h3>
          <p className="subscription-custom-description">{t.customPackage.description}</p>
          <p className="subscription-custom-subtitle">{t.customPackage.subtitle}</p>
          <button onClick={openModal} className="subscription-cta-button subscription-custom-button">{t.buttons.talkToSales}</button>
        </div>
                {/*
        <div className="subscription-consultation-section">
          <div className="subscription-consultation-content">
            <h3>{t.consultation.title}</h3>
            <p>{t.consultation.subtitle}</p>
            <a href="https://calendly.com/d/dzw-nc4-57b/sport-endorse-demo?month=2025-07" target="_blank" rel="noopener noreferrer">
              <button className="subscription-schedule-button">
                {t.consultation.buttonText}
                <svg className="subscription-schedule-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </a>
          </div>
        </div>  */}
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="subscription-modal-overlay" onClick={closeModal}>
          <div className="subscription-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="subscription-modal-header">
              <h3>Custom Package Inquiry</h3>
              <button onClick={closeModal} className="subscription-close-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="subscription-modal-form">
              <div className="hs-form-frame" data-region="na1" data-form-id="cf360f72-9c40-4604-a526-84ce0a32f4b9" data-portal-id="4025606"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}