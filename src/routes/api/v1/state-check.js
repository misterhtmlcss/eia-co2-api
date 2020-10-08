const router = require("express").Router();
const { emissionsSum } = require("../../../controller");

router.get("/", emissionsSum);

module.exports = router;
