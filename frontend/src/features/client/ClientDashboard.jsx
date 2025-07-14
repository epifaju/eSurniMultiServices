import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { AuthContext } from "../../App";

const ClientDashboard = () => {
  const [annonces, setAnnonces] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useContext(AuthContext) || {};

  useEffect(() => {
    if (!userId) return;

    // Charger les annonces du client
    api
      .get(`/annonces/client/${userId}`)
      .then((res) => {
        setAnnonces(res.data);
        setError(null);
      })
      .catch(() => setError("Erreur lors du chargement des annonces."));

    // Charger quelques artisans populaires
    api
      .get("/search/artisans", { params: { page: 0, size: 6, top: true } })
      .then((res) => {
        setArtisans(res.data.content || res.data);
      })
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Mon espace client
          </h1>
          <p className="text-gray-600">
            Gérez vos demandes et trouvez des artisans
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📋</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Mes annonces
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {annonces.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">👷</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Artisans contactés
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Travaux terminés
                </p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mes annonces */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Mes annonces
              </h2>
              <Link
                to="/annonces/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium"
              >
                Nouvelle annonce
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Chargement...</div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <div className="text-red-600">{error}</div>
              </div>
            ) : annonces.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">Aucune annonce trouvée</div>
                <Link
                  to="/annonces/create"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  Créer votre première annonce
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {annonces.slice(0, 3).map((annonce) => (
                  <div
                    key={annonce.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">
                          {annonce.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {annonce.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="mr-4">📍 {annonce.city}</span>
                          <span>
                            📅{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link
                        to={`/annonces/${annonce.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Voir détails →
                      </Link>
                    </div>
                  </div>
                ))}
                {annonces.length > 3 && (
                  <div className="text-center pt-4">
                    <Link
                      to="/annonces"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Voir toutes mes annonces ({annonces.length})
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Artisans populaires */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Artisans populaires
              </h2>
              <Link
                to="/artisans"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Voir tous →
              </Link>
            </div>

            {artisans.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Aucun artisan disponible</div>
              </div>
            ) : (
              <div className="space-y-4">
                {artisans.slice(0, 3).map((artisan) => (
                  <Link
                    key={artisan.id}
                    to={`/artisans/${artisan.id}`}
                    className="block border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      {artisan.photoUrl ? (
                        <img
                          src={artisan.photoUrl}
                          alt={artisan.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {artisan.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {artisan.category}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <span className="mr-3">📍 {artisan.city}</span>
                          <span className="text-yellow-500">
                            ★ {artisan.averageRating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/artisans"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <span className="text-xl">🔍</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Rechercher un artisan
                </h3>
                <p className="text-sm text-gray-600">
                  Trouvez le bon professionnel
                </p>
              </div>
            </Link>

            <Link
              to="/annonces/create"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <span className="text-xl">📝</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Créer une annonce</h3>
                <p className="text-sm text-gray-600">Publiez votre demande</p>
              </div>
            </Link>

            <Link
              to="/search"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                <span className="text-xl">⭐</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Voir les meilleurs
                </h3>
                <p className="text-sm text-gray-600">
                  Artisans les mieux notés
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
