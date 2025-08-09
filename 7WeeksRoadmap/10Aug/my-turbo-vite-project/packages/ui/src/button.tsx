import React from "react";

export const Button = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      style={{ padding: "8px 16px", background: "#1cb5e0", color: "#fff" }}
    >
      {children}
    </button>
  );
};
