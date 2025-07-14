import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const ArtisanListPage = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");

  const fetchArtisans = () => {
    setLoading(true);
    api
      .get("/search/artisans", { params: { page, size, q } })
      .then((res) => {
        setArtisans(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => setArtisans([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchArtisans();
  }, [page, size]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchArtisans();
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Artisans</h2>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Recherche (nom, ville, catégorie...)"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Rechercher
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artisans.map((artisan) => (
          <Link
            to={`/artisans/${artisan.id}`}
            key={artisan.id}
            className="block p-4 border rounded shadow hover:bg-gray-50"
          >
            <div className="flex items-center space-x-4">
              {artisan.photoUrl && (
                <img
                  src={artisan.photoUrl}
                  alt={artisan.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <div className="font-bold">{artisan.name}</div>
                <div className="text-sm text-gray-600">
                  {artisan.city} - {artisan.category}
                </div>
                <div className="text-yellow-500">
                  Note : {artisan.averageRating?.toFixed(1) ?? "-"} ★
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Précédent
        </button>
        <span>
          Page {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ArtisanListPage;
