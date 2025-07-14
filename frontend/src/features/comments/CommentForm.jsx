import React, { useState, useContext } from "react";
import { ToastContext } from "../../App";

const CommentForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const showToast = useContext(ToastContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit({ rating, content });
      showToast("Commentaire ajouté !", "success");
      setRating(5);
      setContent("");
    } catch {
      showToast("Erreur lors de l'ajout du commentaire", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <label className="block">
        Note :
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="ml-2 border p-1 rounded"
          aria-label="Note"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        Commentaire
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Votre commentaire"
          className="w-full border p-2 rounded"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Envoyer
      </button>
    </form>
  );
};

export default CommentForm;
