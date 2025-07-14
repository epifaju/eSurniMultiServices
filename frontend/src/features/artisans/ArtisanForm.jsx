import React, { useState, useContext } from "react";
import { ToastContext } from "../../App";
import api from "../../api";

const ArtisanForm = ({ initialData = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    city: initialData.city || "",
    category: initialData.category || "",
    photoUrl: initialData.photoUrl || "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const showToast = useContext(ToastContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await api.post("/files/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({ ...f, photoUrl: res.data }));
      showToast("Photo uploadée !", "success");
    } catch {
      showToast("Erreur lors de l'upload de la photo", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(form);
      showToast("Profil mis à jour !", "success");
    } catch {
      showToast("Erreur lors de la mise à jour du profil", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Nom
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <label className="block">
        Email
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <label className="block">
        Téléphone
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </label>
      <label className="block">
        Ville
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <label className="block">
        Catégorie
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <label className="block">
        Photo
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full border p-2 rounded"
        />
        {uploading && (
          <span className="text-blue-600 ml-2">Upload en cours...</span>
        )}
        {form.photoUrl && (
          <img
            src={form.photoUrl}
            alt="Aperçu"
            className="mt-2 w-24 h-24 object-cover rounded"
          />
        )}
      </label>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </form>
  );
};

export default ArtisanForm;
