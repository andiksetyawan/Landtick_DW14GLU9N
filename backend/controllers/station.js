const models = require("../models");
// const Pet = models.pet;
// const Species = models.species;
const Station = models.station;

exports.shows = async (req, res) => {
  try {
    const station = await Station.findAll({
      // attributes: { exclude: ["password", "level"] }
    });
    if (station) {
      res.json({
        success: true,
        message: "Station was successfully loaded",
        data: station
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Load Station data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Station data failed, something went wrong",
      data: {}
    });
  }
};
