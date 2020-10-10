const router = require("express").Router();
const { getStoredEmissions } = require("../../../controller");

router.get("/", getStoredEmissions);

module.exports = router;
