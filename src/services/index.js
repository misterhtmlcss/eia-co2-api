// Routes
module.exports = {
  // Create stored data from API requests
  createResults: require("./add-results"),

  // Get Stored data from MongoDB
  findResults: require("./get-results"),
};
