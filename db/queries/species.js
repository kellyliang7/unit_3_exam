const { db } = require("./index.js");

const getAllSpecies = (req, res, next) => {
  db.any("SELECT * FROM Species")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received all species"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleSpecies = (req, res, next) => {
  let speciesId = parseInt(req.params.id);
  db.one("SELECT * FROM Species where id=$1", [speciesId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received one species"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addSpecies = (req, res, next) => {
  db.none(
    "INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "new species added! "
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllSpecies, getSingleSpecies, addSpecies };
