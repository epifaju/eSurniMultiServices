import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { ToastContext } from "../../App";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useContext(ToastContext);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [usersRes, artisansRes, annoncesRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/artisans"),
        api.get("/admin/annonces"),
      ]);
      setUsers(usersRes.data);
      setArtisans(artisansRes.data);
      setAnnonces(annoncesRes.data);
    } catch {
      showToast("Erreur lors du chargement des données admin", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      showToast("Utilisateur supprimé", "success");
      fetchAll();
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const handleDeleteArtisan = async (id) => {
    if (!window.confirm("Supprimer cet artisan ?")) return;
    try {
      await api.delete(`/admin/artisans/${id}`);
      showToast("Artisan supprimé", "success");
      fetchAll();
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const handleDeleteAnnonce = async (id) => {
    if (!window.confirm("Supprimer cette annonce ?")) return;
    try {
      await api.delete(`/admin/annonces/${id}`);
      showToast("Annonce supprimée", "success");
      fetchAll();
    } catch {
      showToast("Erreur lors de la suppression", "error");
    }
  };

  const handleChangeRole = async (id, newRole) => {
    try {
      await api.put(`/admin/users/${id}/role`, { role: newRole });
      showToast("Rôle mis à jour", "success");
      fetchAll();
    } catch {
      showToast("Erreur lors du changement de rôle", "error");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Espace Administration</h2>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Utilisateurs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nom</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Rôle</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="p-2 border">{u.id}</td>
                  <td className="p-2 border">{u.name}</td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">
                    {u.role}
                    <select
                      value={u.role}
                      onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      className="ml-2 border rounded px-1 py-0.5"
                    >
                      <option value="USER">USER</option>
                      <option value="ARTISAN">ARTISAN</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Artisans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nom</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Ville</th>
                <th className="p-2 border">Catégorie</th>
                <th className="p-2 border">Téléphone</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artisans.map((a) => (
                <tr key={a.id}>
                  <td className="p-2 border">{a.id}</td>
                  <td className="p-2 border">{a.name || a.user?.name}</td>
                  <td className="p-2 border">{a.email}</td>
                  <td className="p-2 border">{a.city}</td>
                  <td className="p-2 border">{a.category}</td>
                  <td className="p-2 border">{a.phone}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteArtisan(a.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Annonces</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Titre</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Ville</th>
                <th className="p-2 border">Catégorie</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {annonces.map((ann) => (
                <tr key={ann.id}>
                  <td className="p-2 border">{ann.id}</td>
                  <td className="p-2 border">{ann.title}</td>
                  <td className="p-2 border">{ann.description}</td>
                  <td className="p-2 border">{ann.city}</td>
                  <td className="p-2 border">{ann.category}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeleteAnnonce(ann.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
