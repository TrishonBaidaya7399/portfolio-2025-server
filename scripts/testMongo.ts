import mongoose from "mongoose";

async function testConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://trishonbaidaya:RlWk3sEZgbQ9RqBH@cluster0.2epmryr.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log("Connected to MongoDB Atlas");
    await mongoose.connection.close();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

testConnection();
