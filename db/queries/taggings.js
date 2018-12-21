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
  let researchersId = parseInt(req.params.id);
  db.any(
    "SELECT Taggings FROM researchers JOIN Taggings ON Taggings.researcher_id = researchers.id WHERE researchers.id =$1",
    [researchersId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "All taggings for a researcher!"
      });
    })
    .catch(err => next(err));
};

// const allTaggingsResearcher = (req, res, next) => {
//   let researcher_id = parseInt(req.params.id);
//   db.one(
//     "SELECT * FROM Taggings JOIN Researchers ON Researchers.id = Taggings.researcher_id"
//   )
//     .then(data => {
//       res.status(200).json({
//         status: "success",
//         data: data,
//         message: "Got all taggings for specific researcher!"
//       });
//     })
//     .catch(err => {
//       return next(err);
//     });
// };

const allTaggingsAnimal = (req, res, next) => {
  let animalId = parseInt(req.params.id);
  db.any(
    "SELECT Taggings FROM Animals JOIN taggings ON Taggings.animal_id = Animals.id WHERE Animals.id =$1",
    [animalId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "All taggings for an animal!"
      });
    })
    .catch(err => next(err));
};

const addTaggings = (req, res, next) => {
  db.none(
    "INSERT INTO species(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "new taggings added! "
      });
    })
    .catch(err => next(err));
};
module.exports = {
  getAllTaggings,
  getSingleTagging,
  allTaggingsResearcher,
  allTaggingsAnimal,
  addTaggings
};
