const { db } = require("./index.js");

const getAllResearchers = (req, res, next) => {
  db.any("SELECT * FROM Researchers")
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received all researchers"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.one("SELECT * FROM Researchers where id=$1", [researcherId])
    .then(data => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Received one researcher"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addSingleResearcher = (req, res, next) => {
  const Researchers = req.body;
  Researchers.name = Number(Researchers.job_title);
  db.none(
    "INSERT INTO Researchers(name, job_title) VALUES (${name}, ${job_title})",
    researchers
  )
    .then(() => {
      res.status(200).json({
        status: "success!",
        message: "added single researcher"
      });
    })
    .catch(err => {
      console.log(err);
      next();
    });
};

const updateResearcher = (req, res, next) => {
  db.none(
    "UPDATE Researchers SET job_title=${job_title}, name=${name} WHERE id=${id}",
    {
      job_title: req.body.job_title,
      name: req.body.name,
      id: parseInt(req.params.id)
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "You Updated a researcher!"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteResearcher = (req, res, next) => {
  let researchersId = parseInt(req.params.id);
  db.result("DELETE FROM Researchers WHERE id=$1", researchersId)
    .then(result => {
      res.status(200).json({
        status: "success",
        message: "removed researcher",
        result: result
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getAllResearchers,
  getSingleResearcher,
  addSingleResearcher,
  updateResearcher,
  deleteResearcher
};
