-- Migration pour ajouter les champs city et category dans la table annonces

-- Ajouter les colonnes city et category
ALTER TABLE annonces ADD COLUMN IF NOT EXISTS city VARCHAR(255);
ALTER TABLE annonces ADD COLUMN IF NOT EXISTS category VARCHAR(255);

-- Créer des index pour améliorer les performances des recherches
CREATE INDEX IF NOT EXISTS idx_annonces_city ON annonces(city);
CREATE INDEX IF NOT EXISTS idx_annonces_category ON annonces(category);
CREATE INDEX IF NOT EXISTS idx_annonces_city_category ON annonces(city, category);

-- Mettre à jour les annonces existantes pour copier city et category de l'artisan
UPDATE annonces a
SET city = ar.city, category = ar.category
FROM artisans ar
WHERE a.artisan_id = ar.id
AND a.city IS NULL;

