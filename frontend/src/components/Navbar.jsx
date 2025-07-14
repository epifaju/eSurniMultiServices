import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        Surni MultiServices
      </Link>
      <div className="space-x-4">
        <Link to="/search">Recherche</Link>
        <Link to="/artisans">Artisans</Link>
        <Link to="/annonces">Annonces</Link>
        {role === "ARTISAN" && <Link to="/artisan/dashboard">Mon espace</Link>}
        {role === "ADMIN" && <Link to="/admin">Admin</Link>}
        {!token ? (
          <>
            <Link to="/login">Connexion</Link>
            <Link to="/register">Inscription</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
