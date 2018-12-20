const { db } = require("./index.js");

const getAllAnimals = (req, res, next) => {
  db.any("SELECT * FROM Animals")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received all animals"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.one("SELECT * FROM Animals where id=$1", [animalId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received one animal"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addAnimal = (req, res, next) => {
  db.none(
    "INSERT INTO Animals(species_id, nickname) VALUES(${species_id}, ${nickname})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "new animal added! "
      });
    })
    .catch(err => next(err));
};

const updateAnimal = (req, res, next) => {
  db.none(
    "UPDATE Animals SET species_id=${species_id}, nickname=${nickname} WHERE id=${id}",
    {
      species_id: req.body.species_id,
      nickname: req.body.nickname,
      id: parseInt(req.params.id)
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Updated a animal!"
      });
    })
    .catch(err => next(err));
};

const deleteAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.result("DELETE FROM Animals WHERE id=$1", animalId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "removed animal",
        result: result
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getAllAnimals,
  getSingleAnimal,
  addAnimal,
  updateAnimal,
  deleteAnimal
};
