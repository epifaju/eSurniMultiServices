import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import ArtisanListPage from "../features/artisans/ArtisanListPage";
import ArtisanDetailPage from "../features/artisans/ArtisanDetailPage";
import AnnonceListPage from "../features/annonces/AnnonceListPage";
import AnnonceDetailPage from "../features/annonces/AnnonceDetailPage";
import SearchPage from "../features/search/SearchPage";
import AdminPage from "../features/admin/AdminPage";
import HomePage from "../features/home/HomePage";
import ArtisanDashboard from "../features/artisans/ArtisanDashboard";
import ClientDashboard from "../features/client/ClientDashboard";
// import des autres pages à venir

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/" element={<HomePage />} />
    <Route
      path="/artisan/dashboard"
      element={
        <ProtectedRoute requiredRole="ARTISAN">
          <ArtisanDashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/artisans" element={<ArtisanListPage />} />
    <Route path="/artisans/:id" element={<ArtisanDetailPage />} />
    <Route path="/annonces" element={<AnnonceListPage />} />
    <Route path="/annonces/:id" element={<AnnonceDetailPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute requiredRole="ADMIN">
          <AdminPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/client"
      element={
        <ProtectedRoute requiredRole="CLIENT">
          <ClientDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/artisan"
      element={
        <ProtectedRoute requiredRole="ARTISAN">
          <ArtisanDashboard />
        </ProtectedRoute>
      }
    />
    {/* Ajoute d'autres routes ici */}
  </Routes>
);

export default AppRoutes;
