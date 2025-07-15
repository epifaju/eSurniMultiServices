import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { ToastContext } from "../../App";

const ArtisanProfileTab = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false);
  const showToast = useContext(ToastContext);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    api
      .get(`/artisans/user/${userId}`)
      .then((res) => {
        setProfile(res.data);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          city: res.data.city || "",
          category: res.data.category || "",
          photoUrl: res.data.photoUrl || "",
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setProfile(null); // Affichera le formulaire de création
        } else {
          setProfile(undefined);
          showToast("Erreur lors du chargement du profil", "error");
        }
      });
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
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
      await api.put(`/artisans/${profile.id}`, form);
      setEditing(false);
      const res = await api.get(`/artisans/user/${userId}`);
      setProfile(res.data);
      showToast("Profil mis à jour !", "success");
    } catch {
      showToast("Erreur lors de la mise à jour du profil", "error");
    }
  };

  if (profile === undefined) {
    return <div>Chargement du profil...</div>;
  }
  if (profile === null) {
    // Afficher le formulaire de création si aucun profil n'existe
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await api.post("/artisans", { ...form, user: { id: userId } });
            showToast("Profil créé !", "success");
            const res = await api.get(`/artisans/user/${userId}`);
            setProfile(res.data);
          } catch {
            showToast("Erreur lors de la création du profil", "error");
          }
        }}
        className="space-y-4"
      >
        <label className="block">
          Nom
          <input
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <span className="text-xs text-gray-500">
            Votre nom complet sera affiché publiquement.
          </span>
        </label>
        <label className="block">
          Email
          <input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <span className="text-xs text-gray-500">
            Votre email ne sera pas affiché publiquement.
          </span>
        </label>
        <label className="block">
          Téléphone
          <input
            name="phone"
            value={form.phone || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <span className="text-xs text-gray-500">
            Facultatif. Visible uniquement par l’admin.
          </span>
        </label>
        <label className="block">
          Ville
          <input
            name="city"
            value={form.city || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <span className="text-xs text-gray-500">
            Permet aux clients de vous trouver plus facilement.
          </span>
        </label>
        <label className="block">
          Catégorie
          <input
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <span className="text-xs text-gray-500">
            Exemple : Plomberie, Électricité, Maçonnerie...
          </span>
        </label>
        <label className="block">
          Photo
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border p-2 rounded"
          />
          <span className="text-xs text-gray-500">
            Photo professionnelle recommandée.
          </span>
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
          Créer mon profil
        </button>
      </form>
    );
  }

  return (
    <div>
      {editing ? (
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
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Enregistrer
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => setEditing(false)}
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex items-center gap-4 mb-4">
            {profile.photoUrl && (
              <img
                src={profile.photoUrl}
                alt={profile.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <div className="font-bold text-lg">{profile.name}</div>
              <div className="text-gray-600">
                {profile.city} - {profile.category}
              </div>
              <div className="text-sm">Email : {profile.email}</div>
              <div className="text-sm">Téléphone : {profile.phone}</div>
            </div>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
            onClick={() => setEditing(true)}
          >
            Éditer le profil
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={async () => {
              if (
                !window.confirm(
                  "Êtes-vous sûr de vouloir supprimer votre profil artisan ? Cette action est irréversible."
                )
              )
                return;
              try {
                await api.delete(`/artisans/${profile.id}`);
                showToast("Profil artisan supprimé.", "success");
                setProfile(null);
              } catch {
                showToast("Erreur lors de la suppression du profil.", "error");
              }
            }}
          >
            Supprimer mon profil
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtisanProfileTab;
