const { client } = require("../connect/db");

module.exports.createResults = async (results) => {
  await client.connect();

  const db = await client.db("eia");

  console.log(`Connected successfully to DB ${db.databaseName}`);

  for (const result of results) {
    await db.command({
      insert: `states`,
      documents: [result],
      ordered: false,
      writeConcern: { w: "majority", wtimeout: 5000 },
    });
  }

  await client.close();
};
