const { findResults } = require("../services");

const getStoredEmissions = async (req, res) => {
  try {
    const found = await findResults();

    res.status(200).json({
      message: "Successfully read the database",
      payload: found,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = getStoredEmissions;
