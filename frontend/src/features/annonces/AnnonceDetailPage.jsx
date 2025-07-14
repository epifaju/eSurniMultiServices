import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api";
import CommentList from "../comments/CommentList";
import CommentForm from "../comments/CommentForm";

const AnnonceDetailPage = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    api
      .get(`/annonces/${id}`)
      .then((res) => setAnnonce(res.data))
      .catch(() => setAnnonce(null))
      .finally(() => setLoading(false));
    api
      .get(`/comments/annonce/${id}`)
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  }, [id]);

  const handleAddComment = async (data) => {
    await api.post(`/comments/annonce/${id}`, data);
    const res = await api.get(`/comments/annonce/${id}`);
    setComments(res.data);
  };

  if (loading) return <div>Chargement...</div>;
  if (!annonce) return <div>Annonce introuvable.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <div className="mb-4">
        <div className="text-xl font-bold">{annonce.title}</div>
        <div className="text-gray-600">{annonce.description}</div>
        <div className="text-sm">
          Créée le : {new Date(annonce.createdAt).toLocaleDateString()}
        </div>
      </div>
      {annonce.artisan && (
        <div className="mb-4">
          <div className="font-bold">Artisan :</div>
          <Link
            to={`/artisans/${annonce.artisan.id}`}
            className="text-blue-600 underline"
          >
            {annonce.artisan.user?.name ?? "-"}
          </Link>
        </div>
      )}
      {/* Affichage des commentaires à ajouter ici */}
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
};

export default AnnonceDetailPage;
