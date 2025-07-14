import React, { useEffect, useState } from "react";
import api from "../../api";

const ClientDashboard = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    api
      .get(`/annonces/client/${userId}`)
      .then((res) => {
        setAnnonces(res.data);
        setError(null);
      })
      .catch(() => setError("Erreur lors du chargement des annonces."))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Client</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Mes annonces</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : annonces.length === 0 ? (
            <p>Aucune annonce trouvée.</p>
          ) : (
            <ul className="space-y-2">
              {annonces.map((a) => (
                <li key={a.id} className="border rounded p-2">
                  <div className="font-bold">{a.title}</div>
                  <div className="text-sm text-gray-600">{a.description}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2">Artisans disponibles</h2>
          <p>Liste des artisans ici...</p>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4 mt-6">
        <h2 className="font-semibold mb-2">Mon profil</h2>
        <p>Informations du profil client ici...</p>
      </div>
    </div>
  );
};

export default ClientDashboard;
