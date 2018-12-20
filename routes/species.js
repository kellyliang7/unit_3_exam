const express = require("express");
const router = express.Router();

const {
  getAllSpecies,
  getSingleSpecies,
  addSpecies
} = require("../db/queries/Species.js");

router.get("/", getAllSpecies);
router.get("/:id", getSingleSpecies);
router.post("/", addSpecies);

module.exports = router;
