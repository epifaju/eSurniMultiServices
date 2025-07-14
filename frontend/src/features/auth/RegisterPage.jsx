import React, { useState, useContext } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../App";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const showToast = useContext(ToastContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("userId", res.data.userId);
      showToast("Inscription réussie !", "success");
      navigate("/");
    } catch (err) {
      let msg = "Erreur lors de l'inscription";
      if (err.response && err.response.data) {
        if (typeof err.response.data === "object" && err.response.data.error) {
          msg = err.response.data.error;
        } else if (typeof err.response.data === "string") {
          msg = err.response.data;
        } else {
          msg = "Erreur inattendue (réponse non JSON)";
        }
      } else {
        msg = "Erreur réseau ou serveur injoignable";
      }
      setError(msg);
      showToast(msg, "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="USER">Client</option>
          <option value="ARTISAN">Artisan</option>
        </select>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
