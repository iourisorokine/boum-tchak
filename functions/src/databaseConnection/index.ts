import * as mongoose from "mongoose";

export const databaseConnection = () => {
    mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/boum-tchak", {
    useNewUrlParser: true,
  })
  .then((x: any) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err: any) => {
    console.error("Error connecting to mongo", err);
  });
}