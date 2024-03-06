CREATE TABLE Categorie (
    categ_id INT PRIMARY KEY,
    tip VARCHAR(255)
);

CREATE TABLE Reteta (
    reteta_id INT PRIMARY KEY,
    nume VARCHAR(2000),
    descriere TEXT,
    categ_id INT,
    vegetariana ENUM('D','N'),
    timp_pregatire INT,
    portii INT,
    CONSTRAINT check_condition CHECK ((vegetariana = 'D' AND timp_pregatire < 45) OR (vegetariana = 'N'))
);

CREATE TABLE Ingredient(
    ingred_id INT PRIMARY KEY,
    ingredient VARCHAR(255)
);

CREATE TABLE Set_Ingrediente (
    reteta_id INT,
    ingred_id INT,
    cantitate DECIMAL(10,2) CHECK (cantitate > 0 AND cantitate < 1000),
    um ENUM('gr', 'ml', 'buc', 'lingura', 'lingurita', 'cana'),
    comentarii TEXT,
    PRIMARY KEY (reteta_id, ingred_id),
    FOREIGN KEY (reteta_id) REFERENCES Categorie(reteta_id),
    FOREIGN KEY (ingred_id) REFERENCES Ingredient(ingred_id)
);

SELECT r.nume, r.descriere, r.timp_pregatire
FROM Reteta r
INNER JOIN Categorie c ON r.categ_id = c.categ_id
WHERE c.vegetariana = 'N'
ORDER BY r.timp_pregatire ASC;

SELECT ingredient
FROM Ingredient
WHERE ingredient LIKE '%e';

SELECT r.nume, r.descriere
FROM Reteta r
INNER JOIN Set_Ingrediente si ON r.reteta_id = si.reteta_id
INNER JOIN Ingredient i ON si.ingred_id = i.ingred_id
WHERE i.ingredient = 'lapte' AND si.cantitate = 100 AND si.um = 'gr';

SELECT r1.nume AS name1, r2.nume AS name2
FROM Reteta r1
JOIN Reteta r2 ON r1.categ_id = r2.categ_id
WHERE r1.reteta_id < r2.reteta_id
  AND r1.timp_pregatire = r2.timp_pregatire;




