import React, { useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";

const AnnonceListPage = () => {
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");

  const fetchAnnonces = () => {
    setLoading(true);
    api
      .get("/search/annonces", { params: { page, size, q } })
      .then((res) => {
        setAnnonces(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => setAnnonces([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAnnonces();
  }, [page, size]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(0);
    fetchAnnonces();
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Annonces</h2>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Recherche (titre, description, ville, catégorie...)"
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
        {annonces.map((annonce) => (
          <Link
            to={`/annonces/${annonce.id}`}
            key={annonce.id}
            className="block p-4 border rounded shadow hover:bg-gray-50"
          >
            <div>
              <div className="font-bold">{annonce.title}</div>
              <div className="text-sm text-gray-600 mb-2">
                {annonce.description}
              </div>
              <div className="flex gap-2 text-xs text-gray-500 mb-1">
                {annonce.city && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    📍 {annonce.city}
                  </span>
                )}
                {annonce.category && (
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                    🔧 {annonce.category}
                  </span>
                )}
              </div>
              <div className="text-sm">
                Artisan : {annonce.artisan?.user?.name ?? "-"}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(annonce.createdAt).toLocaleDateString()}
              </div>
              {annonce.status && (
                <div className="mt-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      annonce.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : annonce.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {annonce.status === "PENDING"
                      ? "En attente d'approbation"
                      : annonce.status === "APPROVED"
                      ? "Approuvée"
                      : "Refusée"}
                  </span>
                </div>
              )}
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

export default AnnonceListPage;
