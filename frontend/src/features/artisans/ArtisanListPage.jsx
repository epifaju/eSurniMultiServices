import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";

const ArtisanListPage = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    q: "",
    city: "",
    category: "",
    minRating: "",
    sortBy: "rating",
  });

  const categories = [
    "Plomberie",
    "Électricité",
    "Maçonnerie",
    "Peinture",
    "Jardinage",
    "Menuiserie",
    "Serrurerie",
    "Nettoyage",
  ];

  const cities = [
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Bordeaux",
    "Nantes",
    "Strasbourg",
    "Montpellier",
  ];

  const fetchArtisans = () => {
    setLoading(true);
    const params = {
      page,
      size,
      ...filters,
    };
    api
      .get("/search/artisans", { params })
      .then((res) => {
        setArtisans(res.data.content || res.data);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArtisans();
  }, [page, size, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchArtisans();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Artisans</h1>
          <p className="text-gray-600">Trouvez l'artisan qu'il vous faut</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtres latéraux */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Filtres</h3>

              {/* Recherche */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recherche
                </label>
                <input
                  type="text"
                  placeholder="Nom, spécialité..."
                  value={filters.q}
                  onChange={(e) => handleFilterChange("q", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Ville */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ville
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange("city", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les villes</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catégorie */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note minimum */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note minimum
                </label>
                <select
                  value={filters.minRating}
                  onChange={(e) =>
                    handleFilterChange("minRating", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les notes</option>
                  <option value="4">4 étoiles et plus</option>
                  <option value="3">3 étoiles et plus</option>
                </select>
              </div>

              {/* Tri */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trier par
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">Meilleure note</option>
                  <option value="name">Nom A-Z</option>
                  <option value="city">Ville</option>
                </select>
              </div>

              <button
                onClick={handleSearch}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>

          {/* Liste des artisans */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Chargement...</div>
              </div>
            ) : artisans.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">Aucun artisan trouvé</div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {artisans.map((artisan) => (
                    <Link
                      to={`/artisans/${artisan.id}`}
                      key={artisan.id}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                    >
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          {artisan.photoUrl ? (
                            <img
                              src={artisan.photoUrl}
                              alt={artisan.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-2xl">👤</span>
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600">
                              {artisan.name}
                            </h3>
                            <p className="text-gray-600">{artisan.category}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">📍</span>
                            {artisan.city}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">📞</span>
                            {artisan.phone}
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="font-medium">
                              {artisan.averageRating?.toFixed(1) || "N/A"}
                            </span>
                            <span className="text-gray-500 ml-1">
                              ({artisan.commentCount || 0} avis)
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Précédent
                    </button>
                    <span className="px-4 py-2 text-gray-600">
                      Page {page + 1} sur {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages - 1, p + 1))
                      }
                      disabled={page >= totalPages - 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Suivant
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanListPage;
