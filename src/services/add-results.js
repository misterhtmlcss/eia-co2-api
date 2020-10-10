const { client } = require("../connect/db");

const createResults = async (results) => {
  try {
    if (!results) {
      return null;
    }
    await client.connect();

    const db = await client.db("eia");

    console.log(
      `createResults: Connected successfully to DB ${db.databaseName}`
    );

    await db.command({
      insert: `states`,
      documents: results,
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 },
    });

    return results;
  } catch (err) {
    return { message: err };
  } finally {
    await client.close();
  }
};

module.exports = createResults;
