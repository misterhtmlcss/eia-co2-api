const router = require("express").Router();
const { storeEmissions } = require("../../../controller");

router.post("/", storeEmissions);

module.exports = router;
