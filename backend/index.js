import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { expressjwt } from "express-jwt";

import userRoutes from "./routes/users.js";
import fileRoutes from "./routes/files.js";
import authRoutes from "./routes/user-auth.js";

import { getUserByIdModel } from "./models/users.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
  }).unless({ path: [/^\/auth/, "/"] }) // Exclude auth routes and the home route
);

app.use(async (req, res, next) => {
  if (req.auth?.id) {
    try {
      const user = await getUserByIdModel(req.auth.id);
      if (!user) {
        throw new Error("User not found");
      }
      req.user = user; 
    } catch (error) {
      console.error(error);
      return next(new Error("Authentication failed"));
    }
  }
  next();
});

app.use("/users", userRoutes); 
app.use("/files", fileRoutes); 
app.use("/auth", authRoutes); 


app.get("/", (req, res) => {
  res.send("Welcome to our multilingual file manager platform!");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});