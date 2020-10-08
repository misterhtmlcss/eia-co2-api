const router = require("express").Router();

const { emissionsTax } = require("../../../controller");

router.get("/", emissionsTax);

module.exports = router;
