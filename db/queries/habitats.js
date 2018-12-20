const { db } = require("./index.js");

const getAllHabitats = (req, res, next) => {
  db.any("SELECT * FROM Habitats")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received all habitats"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleHabitat = (req, res, next) => {
  let habitatId = parseInt(req.params.id);
  db.one("SELECT * FROM Habitats where id=$1", [habitatId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received one habitat"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addHabitat = (req, res, next) => {
  db.none("INSERT INTO habitats(category) VALUES(${category})", req.body)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "new habitat added! "
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllHabitats, getSingleHabitat, addHabitat };
