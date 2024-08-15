import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
dotenv.config();
import cropRoute from "./routes/cropRoute.js";
import seedRoute from "./routes/seedRoute.js"
import fertilizerRoute from "./routes/fertilizerRoute.js";
import pestRoute from "./routes/pestRoute.js";
import userRoute from './routes/userRoute.js';
import planRoute from './routes/planRoute.js';
import uploadRoute from './routes/uploadRoutes.js';
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
const app = express();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
await connectDB();
import cors from 'cors';

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
}));


// mongoose.connect("mongodb://127.0.0.1:27017/farmIq");
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());
app.use(express.urlencoded( { extended : true} )); // for parsing
app.use(cookieParser())


app.use("/api/crops", cropRoute);
app.use("/api/users", userRoute);
app.use("/api/fertilizers", fertilizerRoute);
app.use("/api/pests", pestRoute);
app.use("/api/seeds", seedRoute);
app.use("/api/plans", planRoute);
app.use("/api/upload", uploadRoute);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
});
