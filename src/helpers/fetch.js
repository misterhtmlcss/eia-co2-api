const axios = require("axios");
require("dotenv").config();
const baseURL = `https://api.eia.gov/series/?api_key=${process.env.API_KEY}&series_id=EMISS.CO2-TOTV-EC-CO-`

module.exports = {
  getDataForYear: async function getDataForYear(
    searchYear,
    searchState,
    type = "CO2",
    label
  ) {
    const url = `${baseURL}${label}`;
    const { data } = await axios.get(url);
    return {
      data: data.series[0].data,
      year: searchYear,
      state: searchState,
      type,
    };
  },

  getDataForPeriod: async function getDataForYear(
    startYear,
    endYear,
    searchState,
    type = "CO2",
    label
  ) {
    const url = `${baseURL}${label}`;
    const { data } = await axios.get(url);
    return {
      data: data.series[0].data,
      state: searchState,
      start: startYear,
      end: endYear,
      type,
    };
  },

  getData: async function getData(
    type = "CO2",
    label
  ) {
      const url = `${baseURL}${label}`;
      const { data } = await axios.get(url);
      return {
      data: data.series[0].data,
      type,
    };
  }
};
