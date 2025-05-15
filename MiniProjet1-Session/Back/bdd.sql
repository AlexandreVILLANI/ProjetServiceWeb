-- noinspection SqlDialectInspectionForFile

DROP TABLE IF EXISTS Favori CASCADE;
DROP TABLE IF EXISTS Avis CASCADE;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS Panier_activite CASCADE;
DROP TABLE IF EXISTS Panier_article CASCADE;
DROP TABLE IF EXISTS Creneau CASCADE;
DROP TABLE IF EXISTS Concert CASCADE;
DROP TABLE IF EXISTS Film CASCADE;
DROP TABLE IF EXISTS Activite CASCADE;
DROP TABLE IF EXISTS Boutique CASCADE;
DROP TABLE IF EXISTS Prestataire CASCADE;
DROP TABLE IF EXISTS Utilisateur CASCADE;
DROP TABLE IF EXISTS Role CASCADE;
drop table if exists session cascade;
DROP TYPE IF EXISTS type_activite;
DROP TYPE IF EXISTS type_article;
drop table if exists achats cascade;



CREATE TABLE Role(
    id_role SERIAL,
    nom_role VARCHAR(50),
    PRIMARY KEY(id_role)
);

CREATE TABLE Utilisateur(
    id_utilisateur SERIAL,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    adresse_mail VARCHAR(50),
    mot_de_passe VARCHAR(250),
    point_fidelite INT,
    id_role INT NOT NULL,
    PRIMARY KEY(id_utilisateur),
    FOREIGN KEY(id_role) REFERENCES Role(id_role)
);

CREATE TABLE session(
    session_id VARCHAR(255),
    id_utilisateur INT PRIMARY KEY ,
    timeLimit TIMESTAMP,
    FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur) ON DELETE CASCADE
);

CREATE TABLE Prestataire(
    id_prestataire SERIAL,
    nom_societe VARCHAR(50),
    img_prestataire VARCHAR(2000),
    id_utilisateur INT NOT NULL,
    PRIMARY KEY(id_prestataire),
    UNIQUE(id_utilisateur),
    FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);

CREATE TYPE type_activite AS ENUM('Culture', 'Loisir', 'Concert', 'Sport', 'Restauration');


CREATE TABLE Activite (
    id_activite  SERIAL PRIMARY KEY,
    type_activite type_activite NOT NULL,
    nom_activite VARCHAR(255) NOT NULL,
    image_activite VARCHAR(255),
    description_activite VARCHAR(1000),
    prix_activite DECIMAL(10, 2),
    id_prestataire INT,
    vue_activite INT,
    FOREIGN KEY (id_prestataire) REFERENCES Prestataire(id_prestataire),
    CONSTRAINT chk_prix CHECK (
        (type_activite = 'Loisir' AND prix_activite IS NULL) OR
        (type_activite != 'Loisir' AND prix_activite IS NOT NULL)
    )
);

CREATE TABLE Concert (
    id_concert  SERIAL PRIMARY KEY,
    id_activite INT NOT NULL,
    type_concert VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_activite) REFERENCES Activite(id_activite) ON DELETE CASCADE
);


CREATE TABLE Film (
    id_film  SERIAL PRIMARY KEY,
    id_activite INT NOT NULL,
    description_film VARCHAR(1000),
    titre VARCHAR(255) NOT NULL,
    prix_film DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_activite) REFERENCES Activite(id_activite) ON DELETE CASCADE
);


CREATE TABLE Creneau (
    id_creneau  SERIAL PRIMARY KEY,
    id_activite INT NOT NULL,
    date_activite DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    places_disponibles INT NOT NULL,
    FOREIGN KEY (id_activite) REFERENCES Activite(id_activite) ON DELETE CASCADE
);

CREATE TYPE type_article AS ENUM('Porte clé', 'Peluche', 'Stickers', 'Gourde', 'Sac', 'T-shirt','Puretech 1.2');


CREATE TABLE Boutique(
    id_article SERIAL PRIMARY KEY,
    type_article type_article NOT NULL,
    nom_article VARCHAR(50),
    description_article VARCHAR(1000),
    image_article VARCHAR(1000),
    nombre_article INT,
    prix_article DECIMAL(10, 2),
    prix_article_point INT
);

CREATE TABLE Panier_activite (
    id_panier SERIAL PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    id_creneau INT,
    nombre_articles INT NOT NULL,
    prix FLOAT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (id_creneau) REFERENCES Creneau(id_creneau) ON DELETE CASCADE
);

CREATE TABLE Panier_article (
    id_panier SERIAL PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    id_article INT,
    nombre_articles INT NOT NULL,
    prix FLOAT NOT NULL,
    payment INT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (id_article) REFERENCES Boutique(id_article) ON DELETE CASCADE
);

CREATE TABLE Achats (
    id_achat SERIAL PRIMARY KEY,
    id_utilisateur INT NOT NULL,
    id_article INT,
    nom_article VARCHAR(255),
    nombre_articles INT NOT NULL,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY (id_article) REFERENCES Boutique(id_article) ON DELETE CASCADE
);


CREATE TABLE Reservation (
    id_reservation  SERIAL PRIMARY KEY,
    id_creneau INT NOT NULL,
    nombre_places INT NOT NULL,
    id_utilisateur INT,
    date_reservation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_creneau) REFERENCES Creneau(id_creneau) ON DELETE CASCADE,
    FOREIGN KEY (id_utilisateur) REFERENCES Utilisateur(id_utilisateur)
);

CREATE TABLE Avis(
    id_avis SERIAL,
    commentaire VARCHAR(500),
    note DECIMAL(15,2),
    id_activite INT NOT NULL,
    id_utilisateur INT NOT NULL,
    PRIMARY KEY(id_avis),
    FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id_utilisateur) ,
    FOREIGN KEY(id_activite) REFERENCES Activite(id_activite) ON DELETE CASCADE
);

CREATE TABLE Favori(
    id_utilisateur INT,
    id_activite INT,
    PRIMARY KEY(id_utilisateur, id_activite),
    FOREIGN KEY(id_utilisateur) REFERENCES Utilisateur(id_utilisateur),
    FOREIGN KEY(id_activite) REFERENCES Activite(id_activite)
);

INSERT INTO Role (id_role, nom_role) VALUES
    (1,'user'),
    (2,'prestataire'),
    (3,'admin');

INSERT INTO Utilisateur (nom, prenom, adresse_mail, mot_de_passe, point_fidelite, id_role) VALUES
    -- Utilisateur
    ('Dupont', 'Jean', 'jean.dupont@gmail.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 100, 1),

    ('Dupont', 'Jack', 'jack.dupont@gmail.com', '2a18c4b747ddc57ae267f81709473bac4d3fcef623e85014a0ecd98bb19ae699', 100, 1),
    ('Boreal', 'Axel', 'axel.boreal@gmail.com', 'passwordAxel', 0, 1),
    ('Renard', 'Sylvia', 'sylvia.renard@gmail.com', 'passwordSylvia', 0, 1),
    ('Lavande', 'Owen', 'owen.lavande@gmail.com', 'passwordOwen', 0, 1),
    ('Delacroix', 'Ines', 'ines.delacroix@gmail.com', 'passwordInes', 0, 1),
    ('Verdier', 'Milo', 'milo.verdier@gmail.com', 'passwordMilo', 0, 1),
    ('Marceau', 'Lise', 'lise.marceau@gmail.com', 'passwordLise', 0, 1),
    ('Moreau', 'Ethan', 'ethan.moreau@gmail.com', 'passwordEthan', 0, 1),
    ('Baudelaire', 'Selene', 'selene.baudelaire@gmail.com', 'passwordSelene', 0, 1),
    ('Perrot', 'Dorian', 'dorian.perrot@gmail.com', 'passwordDorian', 0, 1),
    ('Leclair', 'Alix', 'alix.leclair@gmail.com', 'passwordAlix', 0, 1),
    ('Perrin', 'Ruben', 'ruben.perrin@gmail.com', 'passwordRuben', 0, 1),
    ('Gaultier', 'Mira', 'mira.gaultier@gmail.com', 'passwordMira', 0, 1),
    ('Blanche', 'Nino', 'nino.blanche@gmail.com', 'passwordNino', 0, 1),
    ('Monet', 'Adele', 'adele.monet@gmail.com', 'passwordAdele', 0, 1),
    ('Rousseau', 'Theo', 'theo.rousseau@gmail.com', 'passwordTheo', 0, 1),
    ('Lambert', 'Ava', 'ava.lambert@gmail.com', 'passwordAva', 0, 1),
    ('Fontaine', 'Liam', 'liam.fontaine@gmail.com', 'passwordLiam', 0, 1),
    ('Dubreuil', 'Mae', 'mae.dubreuil@gmail.com', 'passwordMae', 0, 1),
    ('Beaumont', 'Leo', 'leo.beaumont@gmail.com', 'passwordLeo', 0, 1),
    ('Morin', 'Elisa', 'elisa.morin@gmail.com', 'passwordElisa', 0, 1),
    ('Vernet', 'Cleo', 'cleo.vernet@gmail.com', 'passwordCleo', 0, 1),
    ('Fabre', 'Max', 'max.fabre@gmail.com', 'passwordMax', 0, 1),
    ('Petit', 'Elie', 'elie.petit@gmail.com', 'passwordElie', 0, 1),
    ('Chevalier', 'Lana', 'lana.chevalier@gmail.com', 'passwordLana', 0, 1),
    ('Durand', 'Zoe', 'zoe.durand@gmail.com', 'passwordZoe', 0, 1),
    ('Garnier', 'Lucas', 'lucas.garnier@gmail.com', 'passwordLucas', 0, 1),
    ('Reynaud', 'Emma', 'emma.reynaud@gmail.com', 'passwordEmma', 0, 1),
    ('Loiseau', 'Jules', 'jules.loiseau@gmail.com', 'passwordJules', 0, 1),
    ('Boutin', 'Lila', 'lila.boutin@gmail.com', 'passwordLila', 0, 1),

    -- Prestataire
    ('Martin', 'Julie', 'julie.martin@gmail.com', 'fbb4a8a163ffa958b4f02bf9cabb30cfefb40de803f2c4c346a9d39b3be1b544', NULL, 2),
    ('Durand', 'Marie', 'marie.durand@gmail.com', 'motdepasse123', NULL, 2),
    ('Lefebvre', 'Pierre', 'pierre.lefebvre@gmail.com', 'password456', NULL, 2),
    ('Martin', 'Sophie', 'sophie.martin@gmail.com', 'sophiePass789', NULL, 2),
    ('Bernard', 'Lucas', 'lucas.bernard@gmail.com', 'lucasPass321', NULL, 2),
    ('Dubois', 'Clara', 'clara.dubois@gmail.com', 'claraSecure987', NULL, 2),
    ('Moreau', 'Antoine', 'antoine.moreau@gmail.com', 'antoineSecret123', NULL, 2),
    ('Laurent', 'Julie', 'julie.laurent@gmail.com', 'julieSafe123', NULL, 2),
    ('Simon', 'Hugo', 'hugo.simon@gmail.com', 'hugoStrong456', NULL, 2),
    ('Michel', 'Emma', 'emma.michel@gmail.com', 'emmaPass321', NULL, 2),
    ('Dupont', 'Alice', 'alice.dupont@gmail.com', 'alicePass123', NULL, 2),
    ('Lemoine', 'Thomas', 'thomas.lemoine@gmail.com', 'thomasSecure789', NULL, 2),
    ('Petit', 'Élise', 'elise.petit@gmail.com', 'elisePass456', NULL, 2),
    ('Bernier', 'Julien', 'julien.bernier@gmail.com', 'julienSafe321', NULL, 2),
    ('Dupuis', 'Valérie', 'valerie.dupuis@gmail.com', 'valerieStrong789', NULL, 2),
    ('Gautier', 'François', 'francois.gautier@gmail.com', 'francoisPass987', NULL, 2),
    ('Robert', 'Charlotte', 'charlotte.robert@gmail.com', 'charlotteSecure123', NULL, 2),
    ('Blanc', 'Antoine', 'antoine.blanc@gmail.com', 'antoinePass654', NULL, 2),
    ('Martin', 'Claire', 'claire.martin@gmail.com', 'claireSafe456', NULL, 2),
    ('Roux', 'Nicolas', 'nicolas.roux@gmail.com', 'nicolasPass321', NULL, 2),

    -- Admin
    ('admin', 'admin', 'admin@domain.com', '89e01536ac207279409d4de1e5253e01f4a1769e696db0d6062ca9b8f56767c8', NULL, 3);

INSERT INTO Prestataire(nom_societe, id_utilisateur, img_prestataire) VALUES
    ('Territoire de belfort', 32,'territoire_de_befort'), -- Martin Julie
    ('Delle animation', 33,'delle_aniation'), -- Durand Marie
    ('La poudrière', 34, 'la_poudriere'), --Lefebvre Pierre
    ('Universal Music Group', 35, 'Universal_Music_Group'), --Martin Sophie
    ('Seine Zoo', 36, 'Seine_Zoo'), --Bernand Lucas
    ('Sony Music', 37, 'Sony_Music'), --Dubois Clara
    ('Pathé', 38, 'Pathe'), --Moreau Antoine
    ('Kinepolis', 39,'Kinepolis'), --Laurent Julie
    ('Grrranit', 40,'Grrranit'), --Simon Hugo
    ('Tajmahal', 41, 'tajmahal'), -- Michel Emma
    ('Relais des Forges', 42, 'relais_des_forges'), -- Dupont Alice
    ('Le Pochon Magique', 43, 'pochon_magique'), -- Lemoine Thomas
    ('Bombay Fast Food Indien', 44, 'bombay_fast_food'), -- Petit Élise
    ('Arizon', 45, 'arizona'), -- Bernier Julien
    ('Chick’n’Chips', 46, 'chicknchips'); -- Dupuis Valérie


INSERT INTO Activite (type_activite, nom_activite, image_activite, description_activite, prix_activite, id_prestataire, vue_activite) VALUES
    -- Restauration
    ('Restauration', 'Tajmahal', 'tajmahal', 'Restaurant indien proposant une cuisine authentique.', 25.50, 10, NULL),
    ('Restauration', 'Relais des forges', 'relais_des_forges', 'Restaurant traditionnel français avec des plats maison.', 30.00, 11, NULL),
    ('Restauration', 'Le pochon magique', 'pochon_magique', 'Restaurant spécialisé dans les plats simples et savoureux.', 20.00, 12, NULL),
    ('Restauration', 'Bombay fast food indien', 'bombay_fast_food', 'Fast-food proposant des spécialités indiennes rapides.', 15.00, 13, NULL),
    ('Restauration', 'Arizon', 'arizona', 'Restaurant tex-mex avec une ambiance conviviale.', 22.00, 14, NULL),
    ('Restauration', 'Chick’n’Chips', 'chicknchips', 'Restaurant de poulet frit et spécialités anglaises.', 18.50, 15, NULL),

    -- Sport
    ('Sport', 'Escalade', 'escalade', 'Activité sportive consistant à grimper des parois naturelles ou artificielles.', 40.00, 1, NULL),
    ('Sport', 'VTT', 'vtt', 'Pratique du vélo tout-terrain sur des chemins variés.', 35.00, 1, NULL),
    ('Sport', 'Course d’orientation', 'course_orientation', 'Sport d’orientation en pleine nature à l’aide d’une carte.', 25.00, 1, NULL),
    ('Sport', 'Tir à l’arc', 'tir_arc', 'Activité consistant à tirer des flèches sur une cible.', 30.00, 1, NULL),

    -- Culture
    ('Culture', 'Grotte de Cravanche', 'grotte_cravanche', 'Visite d’une grotte naturelle célèbre dans la région.', 12.00, 1, NULL),
    ('Culture', 'La citadelle', 'citadelle', 'Site historique offrant une vue panoramique et des musées.', 15.00, 1, NULL),
    ('Culture', 'Visite Lion de Belfort', 'lion_belfort', 'Découverte du célèbre monument emblématique de Belfort.', 10.00, 1, NULL),

    -- Concert
    ('Concert', 'What’s up Doc', 'whats_up_doc', 'Café-concert proposant des soirées animées.', 20.00, 2, NULL),
    ('Concert', 'Okuma 10 years tour', 'okuma_10_years', 'Concert célébrant les 10 ans du label Okuma.', 35.00, 2, NULL),
    ('Concert', '22 St.Quartet', '22st_quartet', 'Performance musicale d’un groupe de jazz contemporain.', 28.00, 3, NULL),
    ('Concert', 'Chilla', 'chilla', 'Concert de la rappeuse et chanteuse française Chilla.', 40.00, 3, NULL),
    ('Concert', 'Stromae', 'stromae', 'Spectacle de l’artiste belge Stromae.', 60.00, 3, NULL),
    ('Concert', 'Houdi','houdi', 'Spectacle du rappeur français par Houdi.',75.00,5, NULL),
    ('Concert', 'Nekfeu','nekfeu','Concert du rappeur français Nekfeu.',80.00,5, NULL),
    ('Concert','Alpha Wann','alphawann','Performance musicale du rappeur Alpha Wann.',50.00,5, NULL),
    ('Concert', 'Billie Eilish','billieeilish','Concert de la chanteuse internationale Billie Eilish.',60.00,4, NULL),
    ('Concert','Imagine Dragons','imaginedragons','Spectacle du groupe de rock Imagine Dragons.',30.00,4, NULL),
    ('Concert','Taylor Swift','taylorswift','Concert de la chanteuse américaine Taylor Swift.',25.00,4, NULL),
    ('Concert','Eminem','eminem','Performance du rappeur légendaire Eminem.',10.00,6, NULL),
    ('Concert','Dua Lipa','dualipa','Concert de la pop star britannique Dua Lipa.',45.00,6, NULL),

    -- Loisir
    ('Loisir', 'Pathé', 'pathe', 'Cinéma offrant une large sélection de films récents.', NULL, 7, NULL),
    ('Loisir', 'Kinepolis', 'kinepolis', 'Complexe de cinéma moderne avec de grandes salles.', NULL, 8, NULL),
    ('Loisir', 'Grrranit', 'grrranit', 'Scène nationale proposant des spectacles culturels variés.', NULL, 9, NULL);

INSERT INTO Concert(id_activite, type_concert) VALUES
    (14,'METAL'),
    (15,'RAP'),
    (16,'HIP-HOP'),
    (17,'JAZZ'),
    (18,'RNB'),
    (19,'METAL'),
    (20,'RAP'),
    (21,'HIP-HOP'),
    (22,'JAZZ'),
    (23,'RNB'),
    (24,'METAL'),
    (25,'RAP'),
    (26,'HIP-HOP');


INSERT INTO Film(id_activite, description_film, titre, prix_film) VALUES
    (27, 'Un drame captivant sur les mystères de la finance', 'Le thriller des bourses mondiales', 12),
    (27, 'Une aventure hilarante au cœur des marchés financiers', 'Les traders fous', 10),
    (27, 'Un documentaire fascinant sur les marchés émergents', 'Croissance en Asie', 11),
    (28, 'Une comédie romantique avec un twist financier', 'L’amour en actions', 9),
    (28, 'Un drame poignant sur la vie des investisseurs', 'Chute libre', 12),
    (28, 'Un regard audacieux sur les fraudes financières', 'L’arnaque des milliardaires', 13),
    (29, 'Une histoire inspirante de réussite entrepreneuriale', 'Le parcours du self-made-man', 10),
    (29, 'Un film épique sur la révolution des cryptomonnaies', 'Bitcoin : la révolte', 14),
    (29, 'Un récit émouvant sur la quête de richesse', 'Le prix du succès', 15);

INSERT INTO Avis (commentaire, note, id_activite, id_utilisateur) VALUES
    -- Restauration
        -- Tajmahal
    ('Cuisine délicieuse et service impeccable, une belle expérience.', 5, 1, 2), -- Tajmahal, Fauvel Liora
    ('Très belle grotte.', 5, 11, 2), -- Tajmahal, Fauvel Liora
    ('Très bon guide.', 4, 11, 4), -- Tajmahal, Fauvel Liora
    ('Ennuyeux à en mourir.', 1, 11, 5), -- Tajmahal, Fauvel Liora
    ('Rapport qualité-prix excellent, parfait pour une sortie en famille.', 4.5, 1, 6), -- Tajmahal,
        --Relais des forges
    ('Excellent service et ambiance chaleureuse.', 5, 2, 3),
    ('Repas délicieux, mais un peu cher.', 4, 2, 7),
    ('Accueil froid, mais la nourriture était bonne.', 3, 2, 15),
    ('Très déçu, plats insipides et service lent.', 2, 2, 22),
    ('Endroit magnifique, je recommande fortement.', 5, 2, 12),
    ('Bonne expérience, mais pas inoubliable.', 3, 2, 8),
    ('Cuisine inventive et raffinée.', 5, 2, 18),
    ('Déception totale, les plats ne valaient pas leur prix.', 1, 2, 30),
    ('Le cadre est superbe, mais le service peut être amélioré.', 4, 2, 5),
    ('Un véritable régal, tout était parfait.', 5, 2, 10),
    ('Portions trop petites pour le prix.', 2, 2, 24),
    ('Bonne adresse pour un repas en famille.', 4, 2, 16),
        --Le pochon magique
    ('Sympa, mais manque de créativité dans les plats.', 3, 3, 6),
    ('Service impeccable et cuisine de grande qualité.', 5, 3, 13),
    ('La déco est sympa, mais les plats manquent de saveur.', 3, 3, 4),
    ('J’y retournerai sans hésiter.', 5, 3, 1),
    ('Le service était vraiment trop lent.', 2, 3, 26),
    ('Une très bonne adresse pour les gourmands.', 5, 3, 19),
    ('Les plats manquent de fraîcheur.', 2, 3, 21),
    ('Très bonne cuisine, mais un peu bruyant.', 4, 3, 11),
    ('Un service très professionnel et des plats exquis.', 5, 3, 14),
    ('L’expérience ne vaut pas le détour.', 1, 3, 28),
    ('Cuisine savoureuse et très belle présentation.', 5, 3, 17),
    ('Bon rapport qualité/prix.', 4, 3, 2),
    ('Déception par rapport à la réputation du lieu.', 2, 3, 23),
    ('Endroit cosy et nourriture excellente.', 5, 3, 25),



    -- Sport
    ('Super expérience, l’encadrement était top !', 5, 7, 6), -- Escalade, Delacroix Ines
    ('Un peu difficile pour les débutants, mais on s’est bien amusés.', 4, 8, 7), -- VTT, Verdier Milo
    ('Organisation moyenne, mais l’activité reste sympa.', 3, 9, 8), -- Course d’orientation, Marceau Lise
    ('Activité agréable, mais manque d’explications pour les novices.', 3, 10, 9), -- Tir à l’arc, Moreau Ethan

    -- Culture
    ('Endroit fascinant et riche en histoire, un incontournable.', 5, 11, 10), -- Grotte de Cravanche, Baudelaire Selene
    ('Bien mais un peu trop touristique à mon goût.', 4, 12, 11), -- La Citadelle, Perrot Dorian
    ('Visite rapide, mais le monument est impressionnant.', 4, 13, 12), -- Lion de Belfort, Leclair Alix

    -- Concert
    ('Ambiance incroyable, on a passé une super soirée !', 5, 14, 13), -- What's up Doc, Perrin Ruben
    ('Le son était trop fort, mais les musiciens étaient bons.', 3, 15, 14), -- Okuma 10 Years Tour, Gaultier Mira
    ('Très beau concert, mais trop d’attente avant le début.', 4, 16, 15), -- 22 St. Quartet, Blanche Nino
    ('La performance était exceptionnelle, je recommande !', 5, 17, 16), -- Chilla, Monet Adele
    ('Décevant, l’artiste était en retard et la prestation courte.', 2, 18, 17), -- Stromae, Rousseau Theo

    -- Loisir
    ('Le cinéma est bien équipé, mais les sièges ne sont pas confortables.', 3, 26, 18), -- Pathé, Lambert Ava
    ('Très bonne qualité d’image et de son, parfait pour une soirée détente.', 5, 27, 19), -- Kinepolis, Fontaine Liam
    ('Les spectacles sont originaux, mais parfois difficiles à suivre.', 4, 28, 20); -- Grrranit, Dubreuil Mae



INSERT INTO Creneau(id_activite, date_activite, heure_debut, heure_fin, places_disponibles) VALUES
    -- Restauration
        --Tajmahal
    (1, '2025-04-09', '10:00:00', '12:00:00', 30),
    (1, '2025-04-09', '14:00:00', '16:00:00', 25),
    (1, '2025-04-10', '10:00:00', '14:00:00', 20),
    (1, '2025-04-15', '12:00:00', '14:00:00', 50),
        --Relais des forges
    (2, '2025-04-10', '09:00:00', '11:00:00', 30),
    (2, '2025-04-10', '13:00:00', '15:00:00', 25),
    (2, '2025-04-12', '11:00:00', '13:00:00', 20),
    (2, '2025-04-20', '14:00:00', '16:00:00', 50),
        --Le pochon magique
    (3, '2025-04-09', '11:30:00', '14:00:00', 30),
    (3, '2025-04-09', '18:30:00', '21:00:00', 25),
    (3, '2025-04-11', '12:00:00', '14:30:00', 20),
    (3, '2025-04-15', '19:00:00', '21:30:00', 50),
        --Bombay fast food indien
    (4, '2024-12-16', '19:00:00', '21:00:00', 60),
    (4, '2024-12-17', '12:00:00', '14:00:00', 55),

    -- Sport
        --Escalade
    (7, '2025-04-10', '07:00:00', '09:00:00', 4),
    (7, '2025-04-10', '17:00:00', '19:00:00', 8),
    (7, '2025-04-12', '18:00:00', '20:00:00', 6),
        --VTT
    (7, '2025-04-11', '06:00:00', '08:00:00', 13),
    (7, '2025-04-13', '16:00:00', '18:00:00', 10),
    (7, '2025-04-14', '19:00:00', '21:00:00', 15),
        --Course d'orientation
    (9, '2025-04-09', '08:00:00', '10:30:00', 20),
    (9, '2025-04-11', '14:00:00', '16:30:00', 15),
    (9, '2025-04-15', '09:00:00', '11:30:00', 25),

    -- Culture
        --Grotte de Cravanche
    (11, '2025-04-10', '10:00:00', '12:00:00', 30),
    (11, '2025-04-13', '14:00:00', '16:00:00', 25),
    (11, '2025-04-17', '11:00:00', '13:00:00', 20),
        --La Citadelle
    (12, '2025-04-17', '10:00:00', '12:00:00', 30),
    (12, '2025-04-13', '14:00:00', '16:00:00', 25),
    (12, '2025-04-10', '11:00:00', '13:00:00', 20),
        --Visite du lion de belfort
    (13, '2025-04-17', '10:00:00', '12:00:00', 30),
    (13, '2025-04-13', '14:00:00', '16:00:00', 25),
    (13, '2025-04-10', '11:00:00', '13:00:00', 20),

    -- Concert
        --What's up Doc
    (14, '2024-12-20', '20:00:00', '23:00:00', 100),
    (14, '2024-12-21', '20:00:00', '23:00:00', 120),
    (14, '2024-12-22', '18:00:00', '21:00:00', 90),
        --Okuma 10 years tour
    (15, '2024-12-20', '20:00:00', '23:00:00', 100),
    (15, '2024-12-21', '20:00:00', '23:00:00', 120),
    (15, '2024-12-22', '18:00:00', '21:00:00', 90),
        --22 St.Quartet
    (16, '2024-12-20', '20:00:00', '23:00:00', 100),
    (16, '2024-12-21', '20:00:00', '23:00:00', 120),
    (16, '2024-12-22', '18:00:00', '21:00:00', 90),

    --Loisir
        --Pathé
    (27, '2025-04-10', '14:00:00', '16:00:00', 40),
    (27, '2025-04-12', '20:00:00', '22:00:00', 35),
    (27, '2025-04-14', '18:00:00', '20:00:00', 25),
        --Kinepolis
    (28, '2025-04-10', '14:00:00', '16:00:00', 40),
    (28, '2025-04-12', '20:00:00', '22:00:00', 35),
    (28, '2025-04-14', '18:00:00', '20:00:00', 25),
        --Grrranit
    (29, '2025-04-10', '14:00:00', '16:00:00', 40),
    (29, '2025-04-12', '20:00:00', '22:00:00', 35),
    (29, '2025-04-14', '18:00:00', '20:00:00', 25);


INSERT INTO Boutique (type_article, nom_article, description_article, image_article, nombre_article, prix_article,prix_article_point) VALUES
    ('Porte clé', 'Porte clé de la mascotte du Lion', 'Porte clé sur la mascotte emblématique de belfort', 'porte_cles_lion_belfort',30,12.99,20),
    ('Porte clé', 'Porte clé blason de Belfort', 'Porte clé sur le blason de la ville de belfort', 'Blason Belfort Porte Cle',10,13.99,22),
    ('Porte clé', 'Porte clé Belforce', 'Porte clé sur le logo de Belforce', 'Belforce Porte Cle',24,12.99,20),
    ('Peluche', 'Peluche de la mascotte du Lion', 'Peluche sur la mascotte emblématique de blefort', 'lion Belfort Peluche',43,24.99,35),
    ('Stickers', 'Stickers mascotte du Lion','Stickers sur la mascotte emblématique de blefort','lion Belfort Stickers',23,3.99 ,10),
    ('Stickers', 'Stickers patinoire', 'Stickers de la patinoire de belfort','patinoire Stickers',56,2.99,10),
    ('Stickers','Stickers cinema Pathé', 'Stickers du cinéma Pathé', 'pathe',2,4.99,13),
    ('Sac','Sac de Belforce', 'Sac à l’éphigie de Belforce', 'belforce Sac',0,35.99,60);
