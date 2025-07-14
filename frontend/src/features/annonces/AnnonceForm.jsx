import React, { useState, useContext } from "react";
import { ToastContext } from "../../App";

const AnnonceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
  });
  const showToast = useContext(ToastContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
      showToast("Annonce enregistrée !", "success");
    } catch {
      showToast("Erreur lors de l'enregistrement de l'annonce", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <label className="block">
        Titre
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <label className="block">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default AnnonceForm;
