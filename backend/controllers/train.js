const models = require("../models");
// const Pet = models.pet;
// const Species = models.species;
const Train = models.train;

exports.shows = async (req, res) => {
  try {
    const train = await Train.findAll({
      // attributes: { exclude: ["password", "level"] }
    });
    if (train) {
      res.json({
        success: true,
        message: "Trains was successfully loaded",
        data: train
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Load Trains data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Trains data failed, something went wrong",
      data: {}
    });
  }
};
