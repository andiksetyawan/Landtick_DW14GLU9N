const models = require("../models");
// const Pet = models.pet;
// const Species = models.species;
const Class = models.class;

exports.shows = async (req, res) => {
  try {
    const classes = await Class.findAll({
      // attributes: { exclude: ["password", "level"] }
    });
    if (classes) {
      res.json({
        success: true,
        message: "Classes was successfully loaded",
        data: classes
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Classes Trains data failed",
        data: {}
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Load Classes data failed, something went wrong",
      data: {}
    });
  }
};
