import express from "express";
//import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
}));

//app.use("/users", userRoutes);

export default app;