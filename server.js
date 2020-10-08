require("dotenv").config();

const app = require("./src");

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.error("error", err);
    return;
  }
  process.env.NODE_ENV !== "prod"
    ? console.log(`Listing on port.... http://localhost:${PORT}`)
    : null;
});
