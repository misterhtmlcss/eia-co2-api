const { client } = require("../connect/db");

const findResults = async () => {
  try {
    await client.connect();

    const db = await client.db("eia");

    console.log(`findResults: Connected successfully to DB ${db.databaseName}`);

    const statesCO2DataCollection = db.collection("states");

    const found = statesCO2DataCollection.find();
    const data = await found.toArray();

    return data;
  } catch (err) {
    return { message: err };
  } finally {
    await client.close();
  }
};

module.exports = findResults;
