// const { connect } = require("mongoose");

// const dbConnect = async () => {
//   try {
//     const connectionMade = await connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useUnifiedTopology: true,
//     });

//     // Testing the connection works
//     if (connectionMade.connection.host === "localhost") {
//       console.log(`Local MongoDB connected: ${connectionMade.connection.host}`);
//     } else {
//       console.log(
//         `Remote MongoDB Atlas connection made: ${connectionMade.connection.host}`
//       );
//     }
//   } catch (error) {
//     console.error("error on db connection, message: ", error.message);
//     process.exit(1);
//   }
// };

// module.exports = dbConnect;

// module.exports = {}
const { MongoClient } = require("mongodb");

module.exports = async function conn() {
  // Connection URI
  const uri = process.env.MONGO_URI;

  // Create a new MongoClient
  const client = new MongoClient(uri);
  try {
    // Connect the client to the server
    await client.connect();

    const db = client.db("eia");

    // Establish and verify connection
    await db.command({ ping: 1 });
    console.log(`Connected successfully to server ${db.databaseName}`);
  } catch (err) {
    console.dir(err);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
