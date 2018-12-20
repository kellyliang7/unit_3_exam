const express = require("express");
const router = express.Router();

const {
  getAllTaggings,
  getSingleTagging,
  allTaggingsResearcher
} = require("../db/queries/taggings.js");

router.get("/", getAllTaggings);
router.get("/:id", getSingleTagging);
router.get("/taggings/researchers/:id", allTaggingsResearcher);
// router.patch("/:id", updateAnimal);
// router.delete("/:id", deleteAnimal);

module.exports = router;
