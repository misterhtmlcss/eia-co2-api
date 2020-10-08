const { client } = require("../connect/db");

module.exports.createResults = async (results) => {
  await client.connect();

  const db = await client.db("eia");

  console.log(`Connected successfully to DB ${db.databaseName}`);

  await db.command({
    insert: `states`,
    documents: results,
    ordered: false,
    writeConcern: { w: "majority", wtimeout: 5000 },
  });


  await client.close();
};
