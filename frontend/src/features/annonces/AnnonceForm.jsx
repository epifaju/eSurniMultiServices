import React, { useState, useContext } from "react";
import { ToastContext } from "../../App";

const AnnonceForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    city: initialData.city || "",
    category: initialData.category || "",
  });
  const showToast = useContext(ToastContext);

  const categories = [
    "plomberie",
    "electricite",
    "maconnerie",
    "peinture",
    "jardinage",
    "menuisier",
    "serrurerie",
    "nettoyage",
  ];

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
    <form onSubmit={handleSubmit} className="space-y-4 mb-4">
      <label className="block">
        <span className="text-gray-700 font-medium">Titre</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Ex: Rénovation salle de bain"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="4"
          required
          placeholder="Décrivez votre service en détail..."
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Ville</span>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Ex: Paris"
        />
      </label>

      <label className="block">
        <span className="text-gray-700 font-medium">Catégorie</span>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded mt-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors font-medium"
        >
          Enregistrer
        </button>
        {onCancel && (
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition-colors font-medium"
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
