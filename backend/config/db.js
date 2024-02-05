import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://mohammedsharbas32:X63yiXNGJpdbSje0@ac-vh0pn7e-shard-00-00.vp67l40.mongodb.net:27017,ac-vh0pn7e-shard-00-01.vp67l40.mongodb.net:27017,ac-vh0pn7e-shard-00-02.vp67l40.mongodb.net:27017/?ssl=true&replicaSet=atlas-14blpw-shard-0&authSource=admin&retryWrites=true&w=majority", {
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
