CREATE TABLE Categorie (
    categ_id INT PRIMARY KEY,
    tip VARCHAR(255)
);

CREATE TABLE Reteta (
    reteta_id INT PRIMARY KEY,
    nume VARCHAR2(255),
    descriere VARCHAR2(2000),
    categ_id INT,
    vegetariana CHAR(1) CHECK (vegetariana IN ('D', 'N')),
    timp_pregatire INT,
    portii INT,
    CONSTRAINT check_condition CHECK (
        (vegetariana = 'D' AND timp_pregatire < 45) OR vegetariana = 'N'
    )
);

CREATE TABLE Ingredient(
    ingred_id INT PRIMARY KEY,
    ingredient VARCHAR(255)
);

CREATE TABLE Set_Ingrediente (
    reteta_id INT,
    ingred_id INT,
    cantitate DECIMAL(10,2) CHECK (cantitate > 0 AND cantitate < 1000),
    um VARCHAR(10) CHECK (um IN ('gr', 'ml', 'buc', 'lingura', 'lingurita', 'cana')),
    comentarii VARCHAR(255),
    PRIMARY KEY (reteta_id, ingred_id),
    CONSTRAINT fk_set_ingrediente_reteta FOREIGN KEY (reteta_id) REFERENCES Reteta(reteta_id),
    CONSTRAINT fk_set_ingrediente_ingredient FOREIGN KEY (ingred_id) REFERENCES Ingredient(ingred_id)
);

SELECT r.nume, r.descriere, r.timp_pregatire
FROM Reteta r
WHERE r.vegetariana = 'N'
ORDER BY r.timp_pregatire ASC;


SELECT ingredient
FROM Ingredient
WHERE ingredient LIKE '%e';

SELECT r.nume, r.descriere
FROM Reteta r
JOIN Set_Ingrediente si ON r.reteta_id = si.reteta_id
JOIN Ingredient i ON si.ingred_id = i.ingred_id
WHERE i.ingredient = 'lapte' AND si.cantitate = 100 AND si.um = 'gr';


SELECT r1.nume AS name1, r2.nume AS name2
FROM Reteta r1
JOIN Reteta r2 ON r1.categ_id = r2.categ_id AND r1.timp_pregatire = r2.timp_pregatire
WHERE r1.reteta_id <> r2.reteta_id;

  
SELECT r.nume, r.descriere, r.timp_pregatire
FROM Reteta r
WHERE r.vegetariana = 'D'
  AND r.timp_pregatire <= ALL (SELECT timp_pregatire FROM Reteta WHERE vegetariana = 'D');

SELECT r.nume, r.descriere, r.timp_pregatire
FROM Reteta r
WHERE EXISTS (
    SELECT *
    FROM Set_Ingrediente si
    JOIN Ingredient i ON si.ingred_id = i.ingred_id
    WHERE si.reteta_id = r.reteta_id
    AND i.ingredient = 'ceapa'
    AND si.cantitate < (
        SELECT cantitate
        FROM Set_Ingrediente
        JOIN Ingredient ON Set_Ingrediente.ingred_id = Ingredient.ingred_id
        JOIN Reteta ON Set_Ingrediente.reteta_id = Reteta.reteta_id
        WHERE Ingredient.ingredient = 'ceapa'
        AND Reteta.nume = 'Varza a la Cluj'
    )
);

SELECT c.tip AS recipe_type, MIN(r.timp_pregatire) AS min_prep_time, MAX(r.timp_pregatire) AS max_prep_time
FROM Reteta r
JOIN Categorie c ON r.categ_id = c.categ_id
GROUP BY c.tip;

SELECT
    AVG(si.cantitate) AS average_quantity
FROM
    Set_Ingrediente si
    JOIN Ingredient i ON si.ingred_id = i.ingred_id
    JOIN Reteta r ON si.reteta_id = r.reteta_id
    JOIN Categorie c ON r.categ_id = c.categ_id
WHERE
    i.ingredient = 'usturoi'
    AND c.tip = 'tocana';


CREATE OR REPLACE PROCEDURE Exceptie1308 AS
BEGIN
    -- supa fara apa
    INSERT INTO Exceptii (reteta_id, nume, descriere, categ_id, vegetariana, timp_pregatire, portii, exceptie_natura)
    SELECT r.reteta_id, r.nume, r.descriere, r.categ_id, r.vegetariana, r.timp_pregatire, r.portii, 'Ingredient Missing'
    FROM Reteta r
    WHERE r.tip = 'supa'
      AND NOT EXISTS (
          SELECT 1
          FROM Set_Ingrediente si
          JOIN Ingredient i ON si.ingred_id = i.ingred_id
          WHERE si.reteta_id = r.reteta_id
            AND i.ingredient = 'apa'
      );

    -- vegetariana cu carne
    INSERT INTO Exceptii (reteta_id, nume, descriere, categ_id, vegetariana, timp_pregatire, portii, exceptie_natura)
    SELECT r.reteta_id, r.nume, r.descriere, r.categ_id, r.vegetariana, r.timp_pregatire, r.portii, 'Non-Vegetarian Recipe'
    FROM Reteta r
    WHERE r.vegetariana = 'D'
      AND EXISTS (
          SELECT 1
          FROM Set_Ingrediente si
          JOIN Ingredient i ON si.ingred_id = i.ingred_id
          WHERE si.reteta_id = r.reteta_id
            AND i.ingredient = 'carne'
      );
      
    COMMIT;
END;

CREATE OR REPLACE TRIGGER SetIngredienteTrigger
BEFORE UPDATE OF cantitate, um ON Set_Ingrediente
FOR EACH ROW
DECLARE
    v_rounded_cantitate DECIMAL(10,2);
BEGIN
    IF :NEW.um = 'buc' AND MOD(:NEW.cantitate, 1) <> 0 THEN
        v_rounded_cantitate := ROUND(:NEW.cantitate, 0);
        :NEW.cantitate := v_rounded_cantitate;
    END IF;
END;

CREATE VIEW Retete_Vegetariene AS
SELECT reteta_id, categ_id, tip, nume AS reteta, descriere, timp_preparare, portii,
 ingred_id, ingredient, cantitate, um, comentarii
FROM Categorie NATURAL JOIN Rețetă NATURAL JOIN
 Set_ingrediente NATURAL JOIN Ingredient
WHERE vegetariana = ‘D’; 

CREATE OR REPLACE TRIGGER ReteteVegetariene_InsertTrigger
INSTEAD OF INSERT ON Retete_Vegetariene
FOR EACH ROW
BEGIN
    -- constructor Reteta
    INSERT INTO Reteta (reteta_id, categ_id, tip, nume, descriere, timp_pregatire, portii, vegetariana)
    VALUES (:NEW.reteta_id, :NEW.categ_id, :NEW.tip, :NEW.reteta, :NEW.descriere, :NEW.timp_pregatire, :NEW.portii, 'D');

    -- constructor Set_Ingderiente
    INSERT INTO Set_Ingrediente (reteta_id, ingred_id, cantitate, um, comentarii)
    VALUES (:NEW.reteta_id, :NEW.ingred_id, :NEW.cantitate, :NEW.um, :NEW.comentarii);
END;





