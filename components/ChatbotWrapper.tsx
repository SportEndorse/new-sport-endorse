"use client"
import React, { useState } from "react";

const ChatbotWrapper = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000 }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#0078c1",
            color: "#fff",
            fontSize: "2rem",
            border: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center" }}
          aria-label="Open chat"
        >
          💬
        </button>
        {open && (
          <div
            style={{
              position: "absolute",
              bottom: 72,
              right: 0,
              width: 350,
              height: 500,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column" }}
          >
            {/* Replace below with your chatbot UI/component */}
            <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
              <p>Hi! I’m your AI assistant. How can I help?</p>
              {/* ...chat UI here... */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatbotWrapper;