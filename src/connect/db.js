const { MongoClient } = require("mongodb");

async function conn(results) {
  // Connection URI
  const uri = process.env.MONGO_URI;

  // Create a new MongoClient
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("eia");

    // Establish and verify connection
    for (const result of results) {
      await db.command({
        insert: `states`,
        documents: [result],
        ordered: false,
        writeConcern: { w: "majority", wtimeout: 5000 },
      });
    }
    console.log(`Connected successfully to server ${db.databaseName}`);
  } catch (err) {
    console.dir(err);
  }
}

module.exports = {
  conn,
};
