import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { ToastContext } from "../../App";

const emptyAnnonce = {
  title: "",
  description: "",
  city: "",
  category: "",
};

const MesAnnoncesTab = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyAnnonce);
  const [editingId, setEditingId] = useState(null);
  const showToast = useContext(ToastContext);
  const userId = localStorage.getItem("userId");

  const fetchAnnonces = () => {
    setLoading(true);
    api
      .get(`/annonces/artisan/${userId}`)
      .then((res) => setAnnonces(res.data))
      .catch(() => setAnnonces([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnnonces();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (annonce) => {
    setForm({
      title: annonce.title,
      description: annonce.description,
      city: annonce.city,
      category: annonce.category,
    });
    setEditingId(annonce.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette annonce ?"))
      return;
    try {
      await api.delete(`/annonces/${id}`);
      setAnnonces(annonces.filter((a) => a.id !== id));
      showToast("Annonce supprimée !", "success");
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/annonces/${editingId}`, { ...form, artisanId: userId });
        showToast("Annonce modifiée !", "success");
      } else {
        await api.post(`/annonces`, { ...form, artisanId: userId });
        showToast("Annonce créée !", "success");
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyAnnonce);
      fetchAnnonces();
    } catch {
      showToast("Erreur lors de l'enregistrement", "error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Mes annonces</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setForm(emptyAnnonce);
          }}
        >
          Nouvelle annonce
        </button>
      </div>
      {loading ? (
        <div>Chargement...</div>
      ) : annonces.length === 0 ? (
        <div className="text-gray-500">Aucune annonce.</div>
      ) : (
        <ul className="space-y-2 mb-6">
          {annonces.map((a) => (
            <li
              key={a.id}
              className="border rounded p-2 flex justify-between items-center"
            >
              <div>
                <div className="font-bold">{a.title}</div>
                <div className="text-sm text-gray-600">{a.description}</div>
                <div className="text-xs text-gray-400">
                  {a.city} - {a.category}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(a)}
                >
                  Éditer
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(a.id)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="space-y-2 bg-gray-50 p-4 rounded mb-4"
        >
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
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editingId ? "Enregistrer" : "Créer"}
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setForm(emptyAnnonce);
              }}
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MesAnnoncesTab;
