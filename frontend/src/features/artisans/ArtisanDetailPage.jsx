import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";
import { AuthContext } from "../../App";

const ArtisanDetailPage = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { role, userId } = useContext(AuthContext) || {};

  const loadComments = () => {
    api
      .get(`/comments/artisan/${id}`)
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  };

  useEffect(() => {
    api
      .get(`/artisans/${id}`)
      .then((res) => setArtisan(res.data))
      .catch(() => setArtisan(null))
      .finally(() => setLoading(false));
    loadComments();
  }, [id]);

  const handleAddComment = async (data) => {
    await api.post(`/comments/artisan/${id}`, { ...data, userId });
    loadComments();
  };

  if (loading) return <div>Chargement...</div>;
  if (!artisan) return <div>Artisan introuvable.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="flex items-center space-x-4 mb-4">
        {artisan.photoUrl && (
          <img
            src={artisan.photoUrl}
            alt={artisan.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        )}
        <div>
          <div className="text-xl font-bold">{artisan.name}</div>
          <div className="text-gray-600">
            {artisan.city} - {artisan.category}
          </div>
          <div className="text-yellow-500">
            Note : {artisan.averageRating?.toFixed(1) ?? "-"} ★
          </div>
          <div className="text-sm">Email : {artisan.email}</div>
          <div className="text-sm">Téléphone : {artisan.phone}</div>
        </div>
      </div>
      {/* Affichage des annonces et commentaires à ajouter ici */}
      <CommentList comments={comments} />
      {(role === "USER" || role === "CLIENT") && (
        <CommentForm onSubmit={handleAddComment} />
      )}
    </div>
  );
};

export default ArtisanDetailPage;
