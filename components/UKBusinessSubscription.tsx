"use client";
import React from "react";
import "../styles/businessSubscription.css";

export default function UKBusinessSubscription() {
  const featureCategories = [
    {
      category: "Talent Discovery",
      features: [
        { name: "Access to the platform", trial: true, quarterly: true, annual: true },
        { name: "Advanced search and filters", trial: true, quarterly: true, annual: true },
        { name: "Verified Talent Profiles", trial: true, quarterly: true, annual: true }
      ]
    },
    {
      category: "Communication",
      features: [
        { name: "Direct messaging with talent", trial: true, quarterly: true, annual: true }
      ]
    },
    {
      category: "Campaign Management",
      features: [
        { name: "Post Opportunities to all Talent", trial: false, quarterly: true, annual: true }
      ]
    },
    {
      category: "Growth & Scale",
      features: [
        { name: "Access Unlimited Profiles", trial: false, quarterly: true, annual: true },
        { name: "Target Unlimited Markets", trial: false, quarterly: true, annual: true }
      ]
    },
    {
      category: "Support & Success",
      features: [
        { name: "Dedicated Onboarding", trial: true, quarterly: true, annual: true },
        { name: "Dedicated Customer Success Manager", trial: false, quarterly: false, annual: true }
      ]
    }
  ];

  return (
    <section className="subscription-container">
      <div className="subscription-header">
        <h2 className="subscription-title">Choose Your Plan</h2>
        <p className="subscription-subtitle">Select the perfect plan for your brand&apos;s athlete sponsorship needs</p>
      </div>

      <div className="subscription-table-wrapper">
        <table className="subscription-table">
          <thead>
            <tr>
              <th className="subscription-table-title-cell">Platform Features</th>
              <th className="subscription-plan-header trial-plan">
                <div className="subscription-plan-name">Free Trial</div>
                <div className="subscription-plan-price">
                  <span className="currency">£</span>0<span className="period">/month</span>
                </div>
                <div className="subscription-billing-info">1 month free trial</div>
              </th>
              <th className="subscription-plan-header quarterly-plan">
                <div className="subscription-plan-name">Quarterly Rate</div>
                <div className="subscription-plan-price">
                  <span className="currency">£</span>700<span className="period">/quarter</span>
                </div>
                <div className="subscription-billing-info">Paid every 3 months, +VAT</div>
              </th>
              <th className="subscription-plan-header annual-plan">
                <div className="subscription-plan-name">Annual Rate</div>
                <div className="subscription-plan-price">
                  <span className="currency">£</span>1,799<span className="period">/year</span>
                </div>
                <div className="subscription-billing-info">Paid every 12 months, +VAT</div>
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
            <tr className="subscription-cta-row" style={{ borderBottom: "none" }}>
              <td style={{ borderBottom: "none" }}><strong>Get Started</strong></td>
              <td style={{ borderBottom: "none" }}>
                {/* No button for trial */}
              </td>
              <td style={{ borderBottom: "none", textAlign: "center" }}>
                <a 
                  href="https://platform.sportendorse.com/signup/brand?subscription=trial" 
                  className="subscription-cta-button"
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    padding: "0.75rem 2rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                    display: "inline-block",
                    transition: "all 0.3s ease"
                  }}
                >
                  START FREE TRIAL
                </a>
              </td>
              <td style={{ borderBottom: "none" }}>
                {/* No button for annual */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
