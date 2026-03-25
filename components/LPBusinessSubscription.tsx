"use client";
import React from "react";
import "../styles/businessSubscription.css";

export default function LPBusinessSubscription() {
  return (
    <section className="subscription-container" style={{ background: "#f8fafc", padding: "4rem 2rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <div className="subscription-header" style={{ marginBottom: "3rem" }}>
          <h2 className="subscription-title" style={{ 
            fontSize: "2.5rem",
            color: "#0078c1",
            marginBottom: "1rem"
          }}>CHOOSE YOUR PLAN</h2>
        </div>

        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "3rem 4rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "2px solid #0078c1",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem 4rem",
            maxWidth: "1000px",
            margin: "0 auto"
          }}>
            <div style={{ border: "2px solid #c7d2fe", borderRadius: "14px", padding: "1.5rem" }}>
              <h3 style={{ color: "#4338ca", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Quarterly Rate</h3>
              <p style={{ color: "#1f2937", fontSize: "2rem", fontWeight: "800", marginBottom: "0.25rem" }}>£700<span style={{ fontSize: "1rem", fontWeight: "600", color: "#64748b" }}>/quarter</span></p>
              <p style={{ color: "#64748b", marginBottom: "1rem" }}>Paid every 3 months, +VAT</p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#374151", lineHeight: 1.7 }}>
                <li>Full platform access</li>
                <li>Unlimited profile views and searches</li>
                <li>Post opportunities globally</li>
                <li>Dedicated onboarding</li>
              </ul>
            </div>
            <div style={{ border: "2px solid #bae6fd", borderRadius: "14px", padding: "1.5rem" }}>
              <h3 style={{ color: "#0369a1", fontSize: "1.3rem", marginBottom: "0.5rem" }}>Annual Rate</h3>
              <p style={{ color: "#1f2937", fontSize: "2rem", fontWeight: "800", marginBottom: "0.25rem" }}>£1,799<span style={{ fontSize: "1rem", fontWeight: "600", color: "#64748b" }}>/year</span></p>
              <p style={{ color: "#64748b", marginBottom: "1rem" }}>Paid every 12 months, +VAT</p>
              <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#374151", lineHeight: 1.7 }}>
                <li>Everything in Quarterly</li>
                <li>Customer Success Manager</li>
                <li>Best annual value</li>
                <li>Priority support</li>
              </ul>
            </div>
            
          </div>

          <div style={{ 
            textAlign: "center", 
            marginTop: "2.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid #e5e7eb"
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="https://platform.sportendorse.com/signup/brand?subscription=quarterly"
                className="subscription-cta-button subscription-quarterly-button"
                style={{ 
                  display: "inline-block",
                  fontSize: "1.05rem",
                  padding: "1rem 2rem",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "all 0.3s ease"
                }}
              >
                Subscribe Quarterly
              </a>
              <a
                href="https://platform.sportendorse.com/signup/brand?subscription=annual"
                className="subscription-cta-button subscription-annual-button"
                style={{ 
                  display: "inline-block",
                  fontSize: "1.05rem",
                  padding: "1rem 2rem",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  transition: "all 0.3s ease"
                }}
              >
                Choose Annual Plan
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
