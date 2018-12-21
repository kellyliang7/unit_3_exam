DROP DATABASE IF EXISTS unit_3_exam;
CREATE DATABASE unit_3_exam;

\c unit_3_exam;

DROP TABLE IF EXISTS Researchers;
DROP TABLE IF EXISTS Species;
DROP TABLE IF EXISTS Animals;
DROP TABLE IF EXISTS Habitats;
DROP TABLE IF EXISTS Taggings;
DROP TABLE IF EXISTS Sightings;

CREATE TABLE Researchers (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  job_title VARCHAR NOT NULL
);

CREATE TABLE Species (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  is_mammal BOOLEAN
);

CREATE TABLE Animals (
  id SERIAL PRIMARY KEY,
  species_id INT REFERENCES Species(id),
  nickname VARCHAR NOT NULL
);

CREATE TABLE Habitats(
  id SERIAL PRIMARY KEY,
  category VARCHAR NOT NULL
);

CREATE TABLE Taggings(
  id SERIAL PRIMARY KEY,
  animal_id INT REFERENCES Animals(id) ON DELETE CASCADE,
  researcher_id INT REFERENCES Researchers(id) ON DELETE SET NULL
);

CREATE TABLE Sightings(
  id SERIAL PRIMARY KEY,
  researcher_id INT REFERENCES Researchers(id),
  species_id INT REFERENCES Species(id),
  habitat_id INT REFERENCES Habitats(id)
);

INSERT INTO Researchers(name, job_title)
VALUES ('Mariana Aleta', 'Project Lead'), ('Javed Patrick', 'Senior Field Researcher'), ('Carolina Itai', 'Field Researcher'), ('Jazmyn Gottfried', 'Field Researcher'), ('Ezra Flip', 'Research Intern');

INSERT INTO Species(name, is_mammal)
VALUES('Dolphin', TRUE), ('Moray Eel', TRUE), ('Tiger Shark', FALSE), ('Orca Whale', FALSE), ('Moon Jelly', FALSE);

INSERT INTO Animals(species_id, nickname)
VALUES(1, 'Flip'), (1, 'Skip'), (2, 'Jenkins'), (3, 'Sally'), (5, 'Flapjack'), (5, 'Gibbous'), (5, 'Nox');

INSERT INTO Habitats(category)
VALUES('Shallows'), ('Coral Reef'), ('Tide Pools'), ('Deeps');

INSERT INTO Taggings(animal_id, researcher_id)
VALUES (1, 5), (1, 4), (2, 3), (3, 1), (4, 2), (5, 4), (6, 4), (7, 2);

INSERT INTO Sightings(researcher_id, species_id, habitat_id)
VALUES(4, 4, 4), (1, 3, 4), (3, 5, 3), (5, 2, 2), (2, 1, 1), (5, 2, 1);
