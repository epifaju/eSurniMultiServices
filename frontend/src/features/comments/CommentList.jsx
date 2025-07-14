import React from "react";

const CommentList = ({ comments }) => (
  <div className="mt-4">
    <h3 className="font-bold mb-2">Commentaires</h3>
    {comments && comments.length > 0 ? (
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
    ) : (
      <div className="text-gray-500">Aucun commentaire.</div>
    )}
  </div>
);

export default CommentList;
