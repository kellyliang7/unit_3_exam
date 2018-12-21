const { db } = require("./index.js");

const getAllSightings = (req, res, next) => {
  db.any("SELECT * FROM Species")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received all sightings"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const allSightingsSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.any(
    "SELECT Sightings FROM Species JOIN Sightings ON Sightings.species_id = species.id WHERE species.id =$1",
    [speciesId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "All sightings for species!"
      });
    })
    .catch(err => next(err));
};

const allSightingsResearcher = (req, res, next) => {
  let researchersId = parseInt(req.params.id);
  db.any(
    "SELECT Sightings FROM researchers JOIN Sightings ON Sightings.researcher_id = researchers.id WHERE researchers.id =$1",
    [researchersId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "All sightings for researcher!"
      });
    })
    .catch(err => next(err));
};

const allSightingsHabitat = (req, res, next) => {
  let habitastId = parseInt(req.params.id);
  db.any(
    "SELECT Sightings FROM habitats JOIN Sightings ON Sightings.habitat_id = habitats.id WHERE habitats.id =$1",
    [habitastId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "All sightings for habitat!"
      });
    })
    .catch(err => next(err));
};

const addSighting = (req, res, next) => {
  db.none(
    "INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "new sighting added! "
      });
    })
    .catch(err => next(err));
};

const deleteSighting = (req, res, next) => {
  let sightingId = parseInt(req.params.id);
  db.result("DELETE FROM sightings WHERE id=$1", sightingId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "removed sighting",
        result: result
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getAllSightings,
  allSightingsSpecies,
  allSightingsResearcher,
  allSightingsHabitat,
  addSighting,
  deleteSighting
};
