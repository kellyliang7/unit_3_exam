const { db } = require("./index.js");

const getAllTaggings = (req, res, next) => {
  db.any("SELECT * FROM Taggings")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received all Taggings"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleTagging = (req, res, next) => {
  let taggingId = parseInt(req.params.id);
  db.one("SELECT * FROM Taggings where id=$1", [taggingId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received one tagging"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const allTaggingsResearcher = (req, res, next) => {
  let researcher_id = parseInt(req.params.id);
  db.one(
    "SELECT * FROM Taggings JOIN Researchers ON Researchers.id = Taggings.researcher_id"
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Got all taggings for specific researcher!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = { getAllTaggings, getSingleTagging, allTaggingsResearcher };
