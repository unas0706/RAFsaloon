import app from "./app.js";
import connectDB from "./Utility/connectDB.js";

const PORT = Number(process.env.PORT) || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
