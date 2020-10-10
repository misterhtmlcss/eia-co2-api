const axios = require("axios");
const baseURL = `https://api.eia.gov/series/?api_key=${process.env.API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-`;

module.exports = {
  getDataForYear: async function (searchYear, searchState, label) {
    const url = `${baseURL}${label}`;
    const { data } = await axios.get(url);
    return {
      data: data.series[0].data,
      year: searchYear,
      state: searchState,
    };
  },

  getDataForPeriod: async function (startYear, endYear, searchState, label) {
    const url = `${baseURL}${label}`;
    const { data } = await axios.get(url);
    return {
      data: data.series[0].data,
      state: searchState,
      start: startYear,
      end: endYear,
    };
  },

  getDataFromEIA: async function ({ name, label }) {
    const url = `${baseURL}${label}`;
    const { data } = await axios.get(url);
    return {
      name,
      data: data.series[0].data,
    };
  },

  findChosenStates: async (states, codex, fn) => {
    let data = [];
    for (const state of states) {
      const found = codex.find((obj) => obj.name === state);
      data.push(found);
    }
    return await Promise.all(
      data.map(async (state) => {
        return await fn(state);
      })
    );
  },
};
