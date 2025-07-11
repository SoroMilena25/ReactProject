CREATE DATABASE IF NOT EXISTS netflix_db;
USE netflix_db;

CREATE TABLE netflix_db.categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL
);

CREATE TABLE netflix_db.oeuvres (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    realisateur VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    type ENUM('film', 'serie') NOT NULL,
    categorie_id INT,
    annee INT,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL
);

INSERT INTO netflix_db.categories (nom) VALUES 
('Action'),
('Comédie'),
('Drame');

INSERT INTO netflix_db.oeuvres (titre, realisateur, image, type, categorie_id, annee) VALUES 
('John Wick', 'Chad Stahelski', 'https://images.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg', 'film', 1, 2014),
('Superbad', 'Greg Mottola', 'https://images.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg', 'film', 2, 2007),
('The Shawshank Redemption', 'Frank Darabont', 'https://images.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', 'film', 3, 1994);

INSERT INTO netflix_db.oeuvres (titre, realisateur, image, type, categorie_id, annee) VALUES 
('Breaking Bad', 'Vince Gilligan', 'https://images.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg', 'serie', 1, 2008),
('The Office', 'Greg Daniels', 'https://images.tmdb.org/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg', 'serie', 2, 2005),
('Game of Thrones', 'David Benioff', 'https://images.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg', 'serie', 3, 2011);