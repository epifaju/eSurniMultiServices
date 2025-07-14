import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [top, setTop] = useState(false);
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    api
      .get("/search/artisans", { params: { city, category, top } })
      .then((res) => setArtisans(res.data.content || res.data))
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Recherche d'artisans</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ville"
          className="border p-2 rounded"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Catégorie"
          className="border p-2 rounded"
        />
        <label className="flex items-center space-x-1">
          <input
            type="checkbox"
            checked={top}
            onChange={(e) => setTop(e.target.checked)}
          />
          <span>Top artisans</span>
        </label>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rechercher
        </button>
      </div>
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {artisans.map((artisan) => (
            <Link
              to={`/artisans/${artisan.id}`}
              key={artisan.id}
              className="block p-4 border rounded shadow hover:bg-gray-50"
            >
              <div className="font-bold">{artisan.name}</div>
              <div className="text-sm text-gray-600">
                {artisan.city} - {artisan.category}
              </div>
              <div className="text-yellow-500">
                Note : {artisan.averageRating?.toFixed(1) ?? "-"} ★
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
