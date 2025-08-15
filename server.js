import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoute.js";
import CategoryRoutes from "./routes/CategoryRoute.js";
import ProductRoutes from "./routes/ProductRoute.js";
import formidable from "express-formidable";
import carouselRoutes from "./routes/carouselRoute.js";

import cors from 'cors';
import cloudinary from "./config/cloudinary.js";

//configure env
dotenv.config();

//databse config
connectDB();

// rest object
const app = express();

//middleware - morgan
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(formidable());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/products", ProductRoutes);
app.use("/api/v1/carousel", carouselRoutes);

//rest api create
app.get('/', (req,res) => {
    res.send("Welcome to EComm APP");
});

//PORT
const PORT = process.env.PORT || 8070;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`.bgCyan.white);
});