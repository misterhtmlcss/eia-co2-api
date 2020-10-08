const { getDataForYear } = require("../helpers/fetch");

const emissionsSum = async (req, res) => {
  try {
    const { year, state } = req.query;
    const { codex, capitalize, findStateCode } = res.locals;
    const label = findStateCode(state, codex);

    const { data } = await getDataForYear(year, state, label);

    // [ '2013', 0.593558 ]
    for (const [key, value] of data) {
      if (key === year) {
        const results = {
          title: "state check",
          quantity: value,
          state: capitalize(state),
          year,
        };
        return res.status(200).json(results);
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = emissionsSum;
