import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { role } = useContext(AuthContext) || {};
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-gray-50 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>📞 Besoin d'aide ?</span>
              <span>📧 contact@surni.com</span>
            </div>
            <div className="flex items-center space-x-4">
              {!token ? (
                <>
                  <Link to="/login" className="hover:text-blue-600">
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                  >
                    S'inscrire
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  Se déconnecter
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <div className="font-bold text-xl text-gray-800">Surni</div>
              <div className="text-sm text-gray-500">MultiServices</div>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un artisan, un service..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Rechercher
              </button>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/artisans"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Artisans
            </Link>
            <Link
              to="/annonces"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Annonces
            </Link>
            {role === "ARTISAN" && (
              <Link
                to="/artisan"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Mon espace
              </Link>
            )}
            {role === "CLIENT" && (
              <Link
                to="/client"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
              >
                Mon espace
              </Link>
            )}
            {role === "ADMIN" && (
              <Link
                to="/admin"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
