const express = require("express");
const router = express.Router();

const {
  getAllResearchers,
  getSingleResearcher,
  addSingleResearcher,
  updateResearcher,
  deleteResearcher
} = require("../db/queries/researchers.js");

router.get("/", getAllResearchers);
router.get("/:id", getSingleResearcher);
router.post("/", addSingleResearcher);
router.patch("/:id", updateResearcher);
router.delete("/:id", deleteResearcher);

module.exports = router;
