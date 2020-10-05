const { connect } = require("mongoose");

const dbConnect = async () => {
  try {
    const connectionMade = await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    // Testing the connection works
    if (connectionMade.connection.host === "localhost") {
      console.log(`Local MongoDB connected: ${connectionMade.connection.host}`);
    } else {
      console.log(
        `Remote MongoDB Atlas connection made: ${connectionMade.connection.host}`
      );
    }
  } catch (error) {
    console.error("error on db connection, message: ", error.message);
    process.exit(1);
  }
};

module.exports = dbConnect;
