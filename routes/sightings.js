const express = require("express");
const router = express.Router();

const {
  getAllSightings,
  allSightingsSpecies,
  allSightingsResearcher,
  allSightingsHabitat,
  addSighting,
  deleteSighting
} = require("../db/queries/Sightings.js");

router.get("/", getAllSightings);
router.get("/species/:id", allSightingsSpecies);
router.get("/researchers/:id", allSightingsResearcher);
router.get("/habitats/:id", allSightingsHabitat);
router.post("/", addSighting);
router.delete("/:id", deleteSighting);

module.exports = router;
