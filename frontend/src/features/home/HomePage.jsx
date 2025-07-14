import React from "react";

const HomePage = () => (
  <div className="max-w-3xl mx-auto mt-10 text-center">
    <h1 className="text-4xl font-bold mb-4">
      Bienvenue sur Surni MultiServices
    </h1>
    <p className="text-lg mb-6">
      La plateforme de mise en relation entre artisans qualifiés et clients
      partout en France.
    </p>
    <div className="flex flex-col md:flex-row justify-center gap-4">
      <a
        href="/search"
        className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
      >
        Trouver un artisan
      </a>
      <a
        href="/register"
        className="bg-gray-200 text-blue-700 px-6 py-3 rounded shadow hover:bg-gray-300"
      >
        Devenir artisan
      </a>
    </div>
  </div>
);

export default HomePage;
