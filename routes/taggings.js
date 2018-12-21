const express = require("express");
const router = express.Router();

const {
  getAllTaggings,
  getSingleTagging,
  allTaggingsResearcher,
  allTaggingsAnimal
} = require("../db/queries/taggings.js");

router.get("/", getAllTaggings);
router.get("/:id", getSingleTagging);
router.get("/researchers/:id", allTaggingsResearcher);
router.get("/animals/:id", allTaggingsAnimal);

module.exports = router;
