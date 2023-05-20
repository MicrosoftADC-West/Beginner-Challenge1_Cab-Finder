import express from "express";
import cors from "cors";
import rideRoutes from "./routes/rides";
import utilRoutes from "./routes/utils";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/rides", rideRoutes);

app.use("/", utilRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
