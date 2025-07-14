import React, { useEffect, useState, useContext } from "react";
import api from "../../api";
import { ToastContext } from "../../App";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useContext(ToastContext);

  // Recherche et pagination pour annonces
  const [annonceSearch, setAnnonceSearch] = useState("");
  const [annonceStatus, setAnnonceStatus] = useState("");
  const [annoncePage, setAnnoncePage] = useState(0);
  const annoncesPerPage = 10;
  const filteredAnnonces = annonces.filter(
    (a) =>
      (!annonceSearch ||
        a.title?.toLowerCase().includes(annonceSearch.toLowerCase()) ||
        a.city?.toLowerCase().includes(annonceSearch.toLowerCase()) ||
        a.category?.toLowerCase().includes(annonceSearch.toLowerCase())) &&
      (!annonceStatus ||
        (annonceStatus === "active" ? a.active !== false : a.active === false))
  );
  const totalAnnoncePages = Math.ceil(
    filteredAnnonces.length / annoncesPerPage
  );
  const paginatedAnnonces = filteredAnnonces.slice(
    annoncePage * annoncesPerPage,
    (annoncePage + 1) * annoncesPerPage
  );

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

  // Action activation/désactivation
  const handleToggleActive = async (id, currentActive) => {
    try {
      await api.put(`/admin/annonces/${id}/active`, { active: !currentActive });
      showToast(
        `Annonce ${!currentActive ? "activée" : "désactivée"}`,
        "success"
      );
      fetchAll();
    } catch {
      showToast("Erreur lors du changement de statut", "error");
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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Recherche (titre, ville, catégorie...)"
                value={annonceSearch}
                onChange={(e) => {
                  setAnnonceSearch(e.target.value);
                  setAnnoncePage(0);
                }}
                className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={annonceStatus}
                onChange={(e) => {
                  setAnnonceStatus(e.target.value);
                  setAnnoncePage(0);
                }}
                className="border px-3 py-2 rounded-lg"
              >
                <option value="">Tous statuts</option>
                <option value="active">Actives</option>
                <option value="inactive">Désactivées</option>
              </select>
            </div>
            <span className="text-sm text-gray-500">
              Total : {filteredAnnonces.length}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Titre</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Ville</th>
                  <th className="p-2 border">Catégorie</th>
                  <th className="p-2 border">Client</th>
                  <th className="p-2 border">Artisan</th>
                  <th className="p-2 border">Statut</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAnnonces.map((ann) => (
                  <tr key={ann.id} className="hover:bg-gray-50">
                    <td className="p-2 border font-mono text-xs">{ann.id}</td>
                    <td className="p-2 border font-semibold text-gray-800 max-w-xs truncate">
                      {ann.title}
                    </td>
                    <td className="p-2 border max-w-xs truncate">
                      {ann.description}
                    </td>
                    <td className="p-2 border">{ann.city}</td>
                    <td className="p-2 border">{ann.category}</td>
                    <td className="p-2 border">
                      {ann.client?.name || ann.clientId || "-"}
                    </td>
                    <td className="p-2 border">
                      {ann.artisan?.name || ann.artisanId || "-"}
                    </td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          ann.active === false
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {ann.active === false ? "Désactivée" : "Active"}
                      </span>
                    </td>
                    <td className="p-2 border flex gap-2">
                      <button
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          ann.active === false
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-yellow-500 text-white hover:bg-yellow-600"
                        }`}
                        onClick={() => handleToggleActive(ann.id, ann.active)}
                      >
                        {ann.active === false ? "Activer" : "Désactiver"}
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
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
          {/* Pagination */}
          {totalAnnoncePages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setAnnoncePage((p) => Math.max(0, p - 1))}
                disabled={annoncePage === 0}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Précédent
              </button>
              <span className="px-4 py-2 text-gray-600">
                Page {annoncePage + 1} sur {totalAnnoncePages}
              </span>
              <button
                onClick={() =>
                  setAnnoncePage((p) => Math.min(totalAnnoncePages - 1, p + 1))
                }
                disabled={annoncePage >= totalAnnoncePages - 1}
                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
