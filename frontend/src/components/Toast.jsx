import React from "react";

const Toast = ({ message, type = "success", onClose }) => {
  if (!message) return null;
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow text-white ${
        type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold"
        aria-label="Fermer"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast;
