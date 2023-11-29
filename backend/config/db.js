import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://mohammedsharbas33:sharbas12345678@ac-ohqgxsc-shard-00-00.6fhmvos.mongodb.net:27017,ac-ohqgxsc-shard-00-01.6fhmvos.mongodb.net:27017,ac-ohqgxsc-shard-00-02.6fhmvos.mongodb.net:27017/?ssl=true&replicaSet=atlas-cz2k8d-shard-0&authSource=admin&retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export default connectDB;
