const axios = require("axios");
const router = require("express").Router();
const { getData } = require("../helpers/fetch");
// Route
// http://localhost:5000/save/test?states=alabama

router.get("/", async (req, res, next) => {
  try {
    const { state } = req.query;
    const { codex, findStateCode } = res.locals
    const label = findStateCode(state, codex)

    const url = `https://api.eia.gov/series/?api_key=${process.env.API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-${label}`;

    const { data } = await getData("CO2", url, axios);
    console.log("data", data);


    return res.status(200).json({state, data});
  } catch (err) {
    next(err)
    // return res.status(500).json({ message: "Error!!!" });
  }
});

module.exports = router;
