import app from "./app.js";
import connectDB from "./utility/connectDB.js";

//connecting db
connectDB();

//starting server
app.listen(process.env.PORT, () => {
  console.log("server has started");
});
