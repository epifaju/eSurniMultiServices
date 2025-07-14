ALTER TABLE annonces ADD COLUMN client_id BIGINT;

-- Crée la contrainte de clé étrangère vers la table users
ALTER TABLE annonces ADD CONSTRAINT fk_annonce_client FOREIGN KEY (client_id) REFERENCES users(id);

-- Ajoute la colonne 'active' (par défaut TRUE) pour gérer l'activation/désactivation des annonces
ALTER TABLE annonces ADD COLUMN active BOOLEAN DEFAULT TRUE;