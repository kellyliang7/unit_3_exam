const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Researchers = require("./routes/Researchers.js");
const Species = require("./routes/Species.js");
const Animals = require("./routes/Animals.js");
const Habitats = require("./routes/Habitats.js");
const Taggings = require("./routes/Taggings.js");
const Sightings = require("./routes/Sightings.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/Researchers", Researchers);
app.use("/Species", Species);
app.use("/Animals", Animals);
app.use("/Habitats", Habitats);
app.use("/Taggings", Taggings);
app.use("/Sightings", Sightings);

app.get("*", (req, res) => {
  res.send("error");
});

app.listen(3000, () => {
  console.log("App is listening on port 3000");
});
