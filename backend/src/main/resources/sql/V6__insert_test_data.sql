-- Migration pour créer des utilisateurs de test
-- Note: Les mots de passe sont hashés avec BCrypt (tous = "password123")
-- Hash BCrypt valide pour "password123": $2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga

-- Pour générer un hash BCrypt en Java:
-- BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
-- String hash = encoder.encode("password123");

-- Admin de test
INSERT INTO users (name, email, password, role) 
VALUES 
    ('Admin Test', 'admin@test.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga', 'ADMIN')
ON CONFLICT (email) DO NOTHING;

-- Artisan de test 1 (Plombier à Paris)
INSERT INTO users (name, email, password, role) 
VALUES 
    ('Jean Dupont', 'jean.dupont@artisan.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga', 'ARTISAN')
ON CONFLICT (email) DO NOTHING;

-- Artisan de test 2 (Électricien à Lyon)
INSERT INTO users (name, email, password, role) 
VALUES 
    ('Marie Martin', 'marie.martin@artisan.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga', 'ARTISAN')
ON CONFLICT (email) DO NOTHING;

-- Artisan de test 3 (Maçon à Marseille)
INSERT INTO users (name, email, password, role) 
VALUES 
    ('Pierre Dubois', 'pierre.dubois@artisan.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga', 'ARTISAN')
ON CONFLICT (email) DO NOTHING;

-- Client de test 1
INSERT INTO users (name, email, password, role) 
VALUES 
    ('Sophie Client', 'sophie@client.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga', 'USER')
ON CONFLICT (email) DO NOTHING;

-- Client de test 2
INSERT INTO users (name, email, password, role) 
VALUES 
    ('Thomas Client', 'thomas@client.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8BkXjCg7FQlYz8sXJPJlCjpPBYFpga', 'USER')
ON CONFLICT (email) DO NOTHING;

-- Créer les profils artisans correspondants
INSERT INTO artisans (user_id, photo_url, email, phone, city, category)
SELECT 
    u.id,
    'https://via.placeholder.com/150',
    'jean.dupont@artisan.com',
    '01 23 45 67 89',
    'Paris',
    'plomberie'
FROM users u 
WHERE u.email = 'jean.dupont@artisan.com'
ON CONFLICT DO NOTHING;

INSERT INTO artisans (user_id, photo_url, email, phone, city, category)
SELECT 
    u.id,
    'https://via.placeholder.com/150',
    'marie.martin@artisan.com',
    '04 12 34 56 78',
    'Lyon',
    'electricite'
FROM users u 
WHERE u.email = 'marie.martin@artisan.com'
ON CONFLICT DO NOTHING;

INSERT INTO artisans (user_id, photo_url, email, phone, city, category)
SELECT 
    u.id,
    'https://via.placeholder.com/150',
    'pierre.dubois@artisan.com',
    '04 91 23 45 67',
    'Marseille',
    'maconnerie'
FROM users u 
WHERE u.email = 'pierre.dubois@artisan.com'
ON CONFLICT DO NOTHING;

-- Créer quelques annonces de test
INSERT INTO annonces (title, description, city, category, created_at, artisan_id, active, status)
SELECT 
    'Rénovation salle de bain complète',
    'Spécialiste en rénovation de salles de bain. Installation de douche à l''italienne, baignoire, lavabo. Travail soigné et garantie.',
    'Paris',
    'plomberie',
    NOW(),
    a.id,
    true,
    'APPROVED'
FROM artisans a
JOIN users u ON a.user_id = u.id
WHERE u.email = 'jean.dupont@artisan.com';

INSERT INTO annonces (title, description, city, category, created_at, artisan_id, active, status)
SELECT 
    'Installation électrique neuve et rénovation',
    'Électricien qualifié pour tous vos travaux : installation tableau électrique, prise, luminaires. Aux normes NF C 15-100.',
    'Lyon',
    'electricite',
    NOW(),
    a.id,
    true,
    'APPROVED'
FROM artisans a
JOIN users u ON a.user_id = u.id
WHERE u.email = 'marie.martin@artisan.com';

INSERT INTO annonces (title, description, city, category, created_at, artisan_id, active, status)
SELECT 
    'Construction murs et murets en pierre',
    'Maçon expérimenté pour construction de murs, murets, terrasses. Travail traditionnel à la pierre.',
    'Marseille',
    'maconnerie',
    NOW(),
    a.id,
    true,
    'APPROVED'
FROM artisans a
JOIN users u ON a.user_id = u.id
WHERE u.email = 'pierre.dubois@artisan.com';

-- Ajouter quelques commentaires de test
INSERT INTO comments (rating, content, created_at, artisan_id, user_id)
SELECT 
    5,
    'Excellent travail ! Très professionnel et ponctuel. Je recommande vivement.',
    NOW() - INTERVAL '2 days',
    a.id,
    u.id
FROM artisans a
JOIN users u ON u.email = 'sophie@client.com'
JOIN users u2 ON a.user_id = u2.id
WHERE u2.email = 'jean.dupont@artisan.com';

INSERT INTO comments (rating, content, created_at, artisan_id, user_id)
SELECT 
    4,
    'Bon travail, propre et efficace. Petit retard sur le planning mais résultat satisfaisant.',
    NOW() - INTERVAL '5 days',
    a.id,
    u.id
FROM artisans a
JOIN users u ON u.email = 'thomas@client.com'
JOIN users u2 ON a.user_id = u2.id
WHERE u2.email = 'marie.martin@artisan.com';

INSERT INTO comments (rating, content, created_at, artisan_id, user_id)
SELECT 
    5,
    'Travail impeccable ! Vraiment un artisan passionné. Prix correct.',
    NOW() - INTERVAL '1 week',
    a.id,
    u.id
FROM artisans a
JOIN users u ON u.email = 'sophie@client.com'
JOIN users u2 ON a.user_id = u2.id
WHERE u2.email = 'pierre.dubois@artisan.com';

