import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import { AuthContext } from "../../App";

const AnnonceDetailPage = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { role, userId } = useContext(AuthContext) || {};

  const loadComments = () => {
    if (annonce?.artisan?.id) {
      api
        .get(`/comments/artisan/${annonce.artisan.id}`)
        .then((res) => setComments(res.data))
        .catch(() => setComments([]));
    }
  };

  useEffect(() => {
    api
      .get(`/annonces/${id}`)
      .then((res) => {
        setAnnonce(res.data);
        // Charger les commentaires de l'artisan
        if (res.data?.artisan?.id) {
          api
            .get(`/comments/artisan/${res.data.artisan.id}`)
            .then((commentsRes) => setComments(commentsRes.data))
            .catch(() => setComments([]));
        }
      })
      .catch(() => setAnnonce(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddComment = async (data) => {
    if (annonce?.artisan?.id) {
      await api.post(`/comments/artisan/${annonce.artisan.id}`, {
        ...data,
        userId,
      });
      loadComments();
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!annonce) return <div>Annonce introuvable.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="mb-4">
        <div className="text-2xl font-bold mb-2">{annonce.title}</div>

        {/* Badges pour ville et catégorie */}
        <div className="flex gap-2 mb-3">
          {annonce.city && (
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              📍 {annonce.city}
            </span>
          )}
          {annonce.category && (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              🔧 {annonce.category}
            </span>
          )}
        </div>

        <div className="text-gray-700 mb-3">{annonce.description}</div>
        <div className="text-sm text-gray-500">
          Créée le : {new Date(annonce.createdAt).toLocaleDateString()}
        </div>
      </div>
      {annonce.artisan && (
        <div className="mb-4 p-4 bg-gray-50 rounded">
          <div className="font-bold mb-1">Artisan :</div>
          <Link
            to={`/artisans/${annonce.artisan.id}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            {annonce.artisan.user?.name ?? "-"}
          </Link>
        </div>
      )}
      {/* Affichage des commentaires de l'artisan */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">
          Commentaires sur cet artisan
        </h3>
        <CommentList comments={comments} />
        {(role === "USER" || role === "CLIENT") && (
          <CommentForm onSubmit={handleAddComment} />
        )}
      </div>
    </div>
  );
};

export default AnnonceDetailPage;
