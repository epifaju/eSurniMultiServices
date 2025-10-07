-- Migration pour changer les commentaires d'annonce vers artisan
-- Cette migration supprime la colonne annonce_id et ajoute artisan_id

-- Supprimer la contrainte de clé étrangère existante si elle existe
ALTER TABLE comments DROP CONSTRAINT IF EXISTS fk_comments_annonce;

-- Supprimer l'ancienne colonne annonce_id
ALTER TABLE comments DROP COLUMN IF EXISTS annonce_id;

-- Ajouter la nouvelle colonne artisan_id
ALTER TABLE comments ADD COLUMN IF NOT EXISTS artisan_id BIGINT;

-- Ajouter la contrainte de clé étrangère vers artisans
ALTER TABLE comments ADD CONSTRAINT fk_comments_artisan 
    FOREIGN KEY (artisan_id) REFERENCES artisans(id) ON DELETE CASCADE;

-- Créer un index pour améliorer les performances des requêtes
CREATE INDEX IF NOT EXISTS idx_comments_artisan_id ON comments(artisan_id);

