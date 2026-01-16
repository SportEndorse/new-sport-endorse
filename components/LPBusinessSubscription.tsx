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
          }}>FREE TRIAL</h2>
        </div>

        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "3rem 4rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "2px solid #0078c1",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem 4rem",
            maxWidth: "900px",
            margin: "0 auto"
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Access to the platform</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Advanced search and filters</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Verified Talent Profiles</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Direct messaging with talent</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Access 50 Talent Profiles</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Target 1 Geography of your choice</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#10b981", marginRight: "1rem", fontSize: "1.4rem", fontWeight: "bold", flexShrink: 0 }}>✔</span>
              <span style={{ fontSize: "1.05rem", fontWeight: "600", color: "#1f2937" }}>Dedicated Onboarding</span>
            </div>
            
          </div>

          <div style={{ 
            textAlign: "center", 
            marginTop: "2.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid #e5e7eb"
          }}>
            <a
              href="https://platform.sportendorse.com/signup/brand?subscription=trial"
              className="subscription-cta-button subscription-trial-button"
              style={{ 
                display: "inline-block",
                fontSize: "1.15rem",
                padding: "1rem 3rem",
                background: "#0078c1",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(0,120,193,0.3)"
              }}
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
