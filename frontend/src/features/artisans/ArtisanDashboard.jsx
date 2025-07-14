import React, { useState } from "react";
import ArtisanProfileTab from "./ArtisanProfileTab";
import MesAnnoncesTab from "./MesAnnoncesTab";
import CommentairesTab from "./CommentairesTab";

const tabs = [
  { label: "Profil", component: <ArtisanProfileTab /> },
  { label: "Mes annonces", component: <MesAnnoncesTab /> },
  { label: "Commentaires reçus", component: <CommentairesTab /> },
];

const ArtisanDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Artisan</h1>
      <div className="mb-4 flex gap-2 border-b">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === idx
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded shadow p-4">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default ArtisanDashboard;
