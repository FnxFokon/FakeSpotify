CREATE TABLE
    IF NOT EXISTS `genre` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `genre` (`id`, `label`)
VALUES (1, 'Rock'), (2, 'Rap'), (3, 'Classic'), (4, 'Autre'), (5, 'R\'n\'B'), (6, 'Electro'), (7, 'Variété');

CREATE TABLE
    IF NOT EXISTS `artist` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `biography` longtext COLLATE utf8mb4_unicode_ci,
        `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `artist` (
        `id`,
        `name`,
        `biography`,
        `image_path`
    )
VALUES (
        1,
        'NTM',
        '<div><strong>NTM</strong> est un groupe de rap français originaire de <em>Seine-Saint-Denis (93)</em>, composé principalement des deux rappeurs JoeyStarr et Kool Shen, qui a marqué les débuts du rap en France. Formé en 1988, le groupe se dissout en 1998 avant de se retrouver pour plusieurs concerts événement de 2008 à 2019.</div>',
        'upload_6523b26a07b4c_php9913.tmp.jpg'
    ), (
        2,
        'Soundkail',
        '<div>Dragon Davy croise la route d’Artikal Mehdi sur les bancs de l\'école. Ces deux "gars du 94" vont vite se trouver une passion commune pour le micro et ne le lâcheront plus. 1995, 1996, le Rap, le Reggae, la déferlante Dancehall connaissent une période dorée en France, encadrés par NTM ou IAM qui ouvrent la voie à toute une génération de dignes porte-paroles du "ghetto system" comme Raggasonic ou Tonton David pour ne citer qu\'eux. Dragon Davy et Artikal Mehdi baptisent leur duo SOUNDKAIL... Pour ne rien gâcher, ils ont leur son, leur flow et se font systématiquement remarquer par leurs apparitions, notamment sur des compilations historiques comme "Sachons Dire Non" I et II ou autre "L\'Univers Des Lascars".<br><br>Premier maxi "Attentat" le 6 juin 2000 et franc succès commercial pour très vite livrer un premier album officiel "Racaille Sound System" qui sortira le 19 octobre 2000. Soundkaïl s’attaque aux salles de concerts et enchaine alors les dates partout en France ! Garance Reggae Festival en 2000, 1ères parties des Neg\'Marrons (pour la tournée "Le Bilan") et ils iront même jusqu\'en Pologne. Après le tourbillon de ce premier album, le groupe est indéniablement une valeur sûre à l’énergie scénique communicative. Ils multiplient logiquement les featurings et participations à divers projets et travaillent aux cotés d\'Akhenaton ou encore de Rohff.</div>',
        'upload_6523baefe6b2c_phpE5B4.tmp.jpg'
    ), (
        3,
        'Lunatic',
        '<div>Lunatic est un groupe de hip-hop français, originaire des Hauts-de-Seine. Le groupe se forme en 1994 par deux membres Booba (Boulogne-Billancourt) et Ali (Issy-les-Moulineaux). y débute avec Coup d\'État Phonique. À la suite de problèmes internes, Lunatic rejoint le collectif Beat de Boul et affinent leur style lors des freestyles en compagnie du collectif. Il quitte le collectif pour se joindre à celui de Time Bomb en compagnie des X-Men, d\'Oxmo Puccino, Pit Baccardi et des Ghetto Diplomats (devenus la Famille Haussmann).<br><br>Lunatic publie son premier album studio, Mauvais œil, en septembre 2000. Il se sépare en 2003, et leur label, 45 Scientific publie un dernier projet du groupe en 2006, intitulé Black Album, avec des titres déjà existants et des remixes, accompagnés de deux titres inédits : Tony Coulibaly, solo de Booba, et Récolte c\'que tu sèmes d\'Ali.</div>',
        'upload_6523bb196188c_php864A.tmp.jpg'
    ), (
        4,
        'Céline Dion',
        '<div>Céline Dion est née le 30 mars 1968, à Charlemagne, au Québec, une petite ville à 50 km de Montréal. Elle est la 14e enfant de Thérèse Tanguay et Adhémar Dion. La famille Dion est très modeste mais ne manque surtout pas d’amour. Il y a des enfants partout dans la maison, et la mère de Céline doit même faire dormir sa plus jeune dans un tiroir.<br><br>Déjà, la légende commence…</div>',
        'upload_6523bb42e3f85_php299F.tmp.webp'
    ), (
        5,
        'Skip The Use',
        '<div>Le groupe est composé de cinq anciens membres du groupe de punk Carving. Ils jouent un rock énergique, emmenés par leur chanteur Mat Bastard, de son vrai nom, Mathieu-Emmanuel Monnaert, né le 7 novembre 1979 à Bruxelles. Le premier album éponyme est coproduit par Calysta et NPE ; NPE s\'occupe également de leur première tournée en France (avec quelques dates à l\'étranger). Ils sont sélectionnés par l\'Adami pour le projet « détours », ce qui les propulse rapidement dans des festivals internationaux. Ils se produisent en première partie du groupe Trust puis de Rage Against the Machine.<br><br>Leur premier album, enregistré au studio YellowSub avec Yves Jaget et Manu Guiot membre de NPE, sort en octobre 2009. Après le tournage du clip de leur titre Give me your life, une première tournée les emmène partout en France, mais aussi au Canada, en Suisse, en Belgique, en Allemagne, en Hongrie, en Lettonie. Ils se font également remarquer dans quelques festivals renommés comme le Printemps de Bourges (qui les a propulsés) le Main Square Festival, les Solidays en 2010 et 2011.</div>',
        'upload_6523bb673c453_phpB7D7.tmp.jpg'
    );

CREATE TABLE
    IF NOT EXISTS `album` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `artist_id` int(11) NOT NULL,
        `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `release_date` date NOT NULL,
        `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `created_at` date NOT NULL,
        `updated_at` date DEFAULT NULL,
        `is_active` tinyint(1) NOT NULL,
        PRIMARY KEY (`id`),
        KEY `IDX_39986E43B7970CF8` (`artist_id`),
        CONSTRAINT `FK_39986E43B7970CF8` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `album` (
        `id`,
        `artist_id`,
        `title`,
        `release_date`,
        `image_path`,
        `created_at`,
        `updated_at`,
        `is_active`
    )
VALUES (
        1,
        1,
        'Suprême NTM',
        '1998-07-09',
        'upload_6523b6c42399a_php9AAD.tmp.jpg',
        '2023-10-09',
        '2023-10-09',
        1
    ), (
        2,
        2,
        'A toutes les racailles',
        '2000-10-09',
        'upload_6523bb8a9ae5c_php41B9.tmp.jpg',
        '2023-10-09',
        NULL,
        1
    ), (
        3,
        3,
        'Mauvais oeil',
        '2002-07-24',
        'upload_6523bba2888f1_php9F3B.tmp.jpg',
        '2023-10-09',
        NULL,
        1
    ), (
        4,
        4,
        'Love me back to life',
        '2003-08-27',
        'upload_6523bbc0738a9_php144D.tmp.jpg',
        '2023-10-09',
        NULL,
        1
    ), (
        5,
        5,
        'Little Armageddon',
        '2008-06-24',
        'upload_6523bbdf69245_php8D37.tmp.jpg',
        '2023-10-09',
        NULL,
        1
    );

CREATE TABLE
    IF NOT EXISTS `album_genre` (
        `album_id` int(11) NOT NULL,
        `genre_id` int(11) NOT NULL,
        PRIMARY KEY (`album_id`, `genre_id`),
        KEY `IDX_F5E879DE1137ABCF` (`album_id`),
        KEY `IDX_F5E879DE4296D31F` (`genre_id`),
        CONSTRAINT `FK_F5E879DE1137ABCF` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE,
        CONSTRAINT `FK_F5E879DE4296D31F` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `album_genre` (`album_id`, `genre_id`)
VALUES (1, 2), (2, 2), (2, 4), (3, 2), (4, 7), (5, 1);

CREATE TABLE
    IF NOT EXISTS `avatar` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `is_active` tinyint(1) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `avatar` (
        `id`,
        `image_path`,
        `is_active`
    )
VALUES (1, 'avatar1.jpg', 1), (2, 'avatar2.jpg', 1), (3, 'avatar3.jpg', 1), (4, 'avatar4.jpg', 1), (5, 'avatar5.jpg', 1), (6, 'avatar6.jpg', 1), (7, 'avatar7.jpg', 1), (8, 'avatar8.jpg', 1), (9, 'avatar9.jpg', 1), (10, 'avatar10.jpg', 1), (11, 'avatar11.jpg', 1), (12, 'avatar12.jpg', 1), (13, 'avatar13.jpg', 1), (14, 'avatar14.jpg', 1);

CREATE TABLE
    IF NOT EXISTS `song` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `album_id` int(11) NOT NULL,
        `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `duration` int(11) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `IDX_33EDEEA11137ABCF` (`album_id`),
        CONSTRAINT `FK_33EDEEA11137ABCF` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 19 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `song` (
        `id`,
        `album_id`,
        `title`,
        `file_path`,
        `duration`
    )
VALUES (
        1,
        1,
        'On est encore la',
        'upload_6523c33dc7b03_php578F.tmp.mp3',
        219
    ), (
        2,
        5,
        'Second to none',
        'upload_6523c36b11c92_php871.tmp.mp3',
        186
    ), (
        3,
        4,
        'Love me back to life',
        'upload_6523c37772818_php38D9.tmp.m4a',
        230
    ), (
        4,
        4,
        'Somebody love somebody',
        'upload_6523c382dddee_php6597.tmp.m4a',
        222
    ), (
        5,
        3,
        'Pas l\'temps pour les regrets',
        'upload_6523c38e43b83_php91F7.tmp.mp3',
        281
    ), (
        6,
        1,
        'Back dans les bacs',
        'upload_6523c397d0f43_phpB753.tmp.mp3',
        197
    ), (
        7,
        4,
        'Incredible',
        'upload_6523c3a517f8e_phpEB25.tmp.m4a',
        236
    ), (
        8,
        1,
        'Laisse pas trainer ton fils',
        'upload_6523c3ad6a280_phpB8F.tmp.mp3',
        238
    ), (
        9,
        2,
        'Bandits',
        'upload_6523c3b695bb1_php2F54.tmp.bin',
        280
    ), (
        10,
        3,
        'La lettre',
        'upload_6523c3c0b9485_php5711.tmp.mp3',
        290
    ), (
        11,
        2,
        'Freestyle Dragon Davy',
        'upload_6523c3c9ae130_php7A2B.tmp.bin',
        88
    ), (
        12,
        2,
        'Freestyle Medhi Mesrine',
        'upload_6523c3d58b500_phpA87F.tmp.bin',
        47
    ), (
        13,
        3,
        'Têtes brûlées',
        'upload_6523c3dd9d4f3_phpC7FE.tmp.mp3',
        258
    ), (
        14,
        1,
        'Ma benz',
        'upload_6523c3e5c2de7_phpE7DC.tmp.mp3',
        247
    ), (
        15,
        5,
        'Little Armageddon',
        'upload_6523c3f04e806_php1110.tmp.mp3',
        185
    ), (
        16,
        3,
        '92 i feat Malekal Morte',
        'upload_6523c3f9d0f97_php363C.tmp.mp3',
        347
    ), (
        17,
        1,
        'Pose ton gun',
        'upload_6523c402bc8d0_php5907.tmp.mp3',
        176
    ), (
        18,
        5,
        'Gone Away',
        'upload_6523c40cc2a20_php8028.tmp.mp3',
        188
    );

CREATE TABLE
    IF NOT EXISTS `user` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
        `roles` json NOT NULL,
        `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `nickname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        `created_at` date NOT NULL,
        `avatar_id` int(11) DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
        KEY `IDX_8D93D64986383B10` (`avatar_id`),
        CONSTRAINT `FK_8D93D64986383B10` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

INSERT INTO
    `user` (
        `id`,
        `email`,
        `roles`,
        `password`,
        `nickname`,
        `created_at`,
        `avatar_id`
    )
VALUES (
        1,
        'admin@admin.com',
        '[]',
        '$2y$13$3CA8JxCQqTuROIte1cveEOtpi2e15Atky9ntLV9gvc8GOAQLU.fwu',
        'admin',
        '2023-10-13',
        1
    ), (
        7,
        'admin2@admin.com',
        '[]',
        '$2y$13$KfF9hz2T3N7e5OEsflDiBO1WY5ZJuQD/A80cS/NcBtlXuJICb/MIi',
        'admin',
        '2023-10-13',
        10
    ), (
        8,
        'admin3@admin.com',
        '[]',
        '$2y$13$CN6fnFlaOLy4ZkkDj1tcSunf/fhb4AcEFb5sokqOXgvV35hKO8z6m',
        'Admin3',
        '2023-10-13',
        13
    );

CREATE TABLE
    IF NOT EXISTS `doctrine_migration_versions` (
        `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
        `executed_at` datetime DEFAULT NULL,
        `execution_time` int(11) DEFAULT NULL,
        PRIMARY KEY (`version`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

INSERT INTO
    `doctrine_migration_versions` (
        `version`,
        `executed_at`,
        `execution_time`
    )
VALUES (
        'DoctrineMigrations\\Version20231009070735',
        '2023-10-09 07:07:43',
        606
    ), (
        'DoctrineMigrations\\Version20231009080719',
        '2023-10-09 08:07:26',
        76
    ), (
        'DoctrineMigrations\\Version20231013142212',
        '2023-10-13 14:22:20',
        131
    ), (
        'DoctrineMigrations\\Version20231019083836',
        '2023-10-19 08:38:50',
        230
    );

CREATE TABLE
    IF NOT EXISTS `messenger_messages` (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
        `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
        `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
        `created_at` datetime NOT NULL,
        `available_at` datetime NOT NULL,
        `delivered_at` datetime DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
        KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
        KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS `playlist` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `user_id` int(11) NOT NULL,
        `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
        PRIMARY KEY (`id`),
        KEY `IDX_D782112DA76ED395` (`user_id`),
        CONSTRAINT `FK_D782112DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS `song_playlist` (
        `song_id` int(11) NOT NULL,
        `playlist_id` int(11) NOT NULL,
        PRIMARY KEY (`song_id`, `playlist_id`),
        KEY `IDX_7C5E4765A0BDB2F3` (`song_id`),
        KEY `IDX_7C5E47656BBD148` (`playlist_id`),
        CONSTRAINT `FK_7C5E47656BBD148` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE,
        CONSTRAINT `FK_7C5E4765A0BDB2F3` FOREIGN KEY (`song_id`) REFERENCES `song` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS `user_album` (
        `user_id` int(11) NOT NULL,
        `album_id` int(11) NOT NULL,
        PRIMARY KEY (`user_id`, `album_id`),
        KEY `IDX_DB5A951BA76ED395` (`user_id`),
        KEY `IDX_DB5A951B1137ABCF` (`album_id`),
        CONSTRAINT `FK_DB5A951B1137ABCF` FOREIGN KEY (`album_id`) REFERENCES `album` (`id`) ON DELETE CASCADE,
        CONSTRAINT `FK_DB5A951BA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;