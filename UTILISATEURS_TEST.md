# 👥 Utilisateurs de Test - Surni MultiServices

## 🔐 Informations de Connexion

**Mot de passe universel pour tous les comptes de test : `password123`**

---

## 👨‍💼 Administrateur

### Admin Test

- **Email :** `admin@test.com`
- **Mot de passe :** `password123`
- **Rôle :** ADMIN
- **Accès :** Espace administration complet

---

## 🔧 Artisans

### 1. Jean Dupont - Plombier (Paris)

- **Email :** `jean.dupont@artisan.com`
- **Mot de passe :** `password123`
- **Rôle :** ARTISAN
- **Ville :** Paris
- **Catégorie :** Plomberie
- **Téléphone :** 01 23 45 67 89
- **Annonce :** "Rénovation salle de bain complète"
- **Note moyenne :** ⭐⭐⭐⭐⭐ (5/5 - 1 commentaire)

### 2. Marie Martin - Électricienne (Lyon)

- **Email :** `marie.martin@artisan.com`
- **Mot de passe :** `password123`
- **Rôle :** ARTISAN
- **Ville :** Lyon
- **Catégorie :** Électricité
- **Téléphone :** 04 12 34 56 78
- **Annonce :** "Installation électrique neuve et rénovation"
- **Note moyenne :** ⭐⭐⭐⭐ (4/5 - 1 commentaire)

### 3. Pierre Dubois - Maçon (Marseille)

- **Email :** `pierre.dubois@artisan.com`
- **Mot de passe :** `password123`
- **Rôle :** ARTISAN
- **Ville :** Marseille
- **Catégorie :** Maçonnerie
- **Téléphone :** 04 91 23 45 67
- **Annonce :** "Construction murs et murets en pierre"
- **Note moyenne :** ⭐⭐⭐⭐⭐ (5/5 - 1 commentaire)

---

## 👤 Clients

### 1. Sophie Client

- **Email :** `sophie@client.com`
- **Mot de passe :** `password123`
- **Rôle :** USER (Client)
- **Accès :** Recherche d'artisans, création de commentaires

### 2. Thomas Client

- **Email :** `thomas@client.com`
- **Mot de passe :** `password123`
- **Rôle :** USER (Client)
- **Accès :** Recherche d'artisans, création de commentaires

---

## 📊 Données de Test Incluses

### Annonces (3)

1. **Rénovation salle de bain** - Jean Dupont, Paris, Plomberie
2. **Installation électrique** - Marie Martin, Lyon, Électricité
3. **Construction murs en pierre** - Pierre Dubois, Marseille, Maçonnerie

### Commentaires (3)

1. Sophie → Jean Dupont : ⭐⭐⭐⭐⭐ "Excellent travail !"
2. Thomas → Marie Martin : ⭐⭐⭐⭐ "Bon travail, propre et efficace"
3. Sophie → Pierre Dubois : ⭐⭐⭐⭐⭐ "Travail impeccable !"

---

## 🚀 Comment Utiliser

### 1. Démarrer l'application

```bash
docker-compose down
docker-compose up --build
```

### 2. Se connecter

- Aller sur `http://localhost:5173/login`
- Utiliser l'un des emails ci-dessus
- Mot de passe : `password123`

### 3. Tester les fonctionnalités

#### En tant qu'Admin (`admin@test.com`)

- ✅ Voir tous les utilisateurs
- ✅ Voir tous les artisans
- ✅ Modérer les annonces (approuver/refuser)
- ✅ Supprimer des utilisateurs/artisans/annonces
- ✅ Changer les rôles des utilisateurs

#### En tant qu'Artisan (`jean.dupont@artisan.com`)

- ✅ Éditer son profil artisan
- ✅ Créer/modifier/supprimer ses annonces
- ✅ Voir ses commentaires reçus
- ✅ Voir son tableau de bord avec statistiques

#### En tant que Client (`sophie@client.com`)

- ✅ Rechercher des artisans par ville/catégorie
- ✅ Voir les profils d'artisans
- ✅ Laisser des commentaires et notes
- ✅ Consulter les annonces

---

## 🔧 Personnalisation

Pour créer vos propres utilisateurs de test, vous pouvez :

1. **Via l'interface** : Utiliser la page d'inscription `/register`
2. **Via SQL** : Modifier le fichier `V6__insert_test_data.sql`

### Générer un mot de passe hashé (BCrypt)

En Java :

```java
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
String hash = encoder.encode("votre_mot_de_passe");
System.out.println(hash);
```

En ligne : https://bcrypt-generator.com/ (utiliser 10 rounds)

---

## ⚠️ Important

- **Ces comptes sont pour TEST uniquement**
- Ne pas utiliser en production
- Le mot de passe `password123` est faible et prévisible
- En production, forcer des mots de passe forts

---

## 🎯 Scénarios de Test Suggérés

### 1. Flux Artisan Complet

1. Se connecter avec `jean.dupont@artisan.com`
2. Créer une nouvelle annonce
3. Modifier son profil
4. Voir les commentaires reçus

### 2. Flux Client Complet

1. Se connecter avec `sophie@client.com`
2. Rechercher des artisans à Paris
3. Consulter le profil de Jean Dupont
4. Laisser un commentaire et une note

### 3. Flux Admin Complet

1. Se connecter avec `admin@test.com`
2. Voir tous les utilisateurs
3. Approuver/refuser des annonces
4. Changer le rôle d'un utilisateur
5. Supprimer une annonce

---

## 📝 Notes

- La migration `V6__insert_test_data.sql` est **idempotente** (utilise `ON CONFLICT DO NOTHING`)
- Les données sont insérées seulement si elles n'existent pas déjà
- Vous pouvez relancer la migration sans risque de doublons
- Les commentaires sont datés pour simuler un historique réaliste

---

## ✅ Vérification

Pour vérifier que les données ont été insérées :

```sql
-- Compter les utilisateurs
SELECT role, COUNT(*) FROM users GROUP BY role;

-- Lister les artisans
SELECT u.name, a.city, a.category FROM artisans a
JOIN users u ON a.user_id = u.id;

-- Lister les annonces approuvées
SELECT title, city, category FROM annonces WHERE status = 'APPROVED';

-- Voir les commentaires
SELECT c.rating, c.content, u.name as client_name
FROM comments c
JOIN users u ON c.user_id = u.id;
```

Bonne exploration de l'application ! 🚀
