import React, { useEffect, useState } from "react";
import api from "../../api";

const CommentairesTab = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    // On récupère l'id de l'artisan à partir de l'utilisateur connecté
    api
      .get(`/artisans/user/${userId}`)
      .then((res) => {
        const artisanId = res.data.id;
        return api.get(`/comments/artisan/${artisanId}`);
      })
      .then((res) => setComments(res.data))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Commentaires reçus</h2>
      {loading ? (
        <div>Chargement...</div>
      ) : comments.length === 0 ? (
        <div className="text-gray-500">Aucun commentaire reçu.</div>
      ) : (
        <ul className="space-y-2">
          {comments.map((comment) => (
            <li key={comment.id} className="border p-2 rounded">
              <div className="text-yellow-500">Note : {comment.rating} ★</div>
              <div>{comment.content}</div>
              <div className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentairesTab;
