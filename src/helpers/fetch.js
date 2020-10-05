module.exports = {
  getDataForYear: async function getDataForYear(
    searchYear,
    searchState,
    type = "CO2",
    url,
    axios
  ) {
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
    url,
    axios
  ) {
    const { data } = await axios.get(url);
    return {
      data: data.series[0].data,
      state: searchState,
      start: startYear,
      end: endYear,
      type,
    };
  },
};
