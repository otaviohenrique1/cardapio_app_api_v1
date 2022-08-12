import express from "express";
import cors from "cors";
import path from "path";
import 'express-async-errors';
import routes from "./routes";
import errorHandler from "./errors/handler";
import { PORT } from "./utils/constantes";
// import morgan from "morgan";

const app = express();

app.use(cors());
// app.use(morgan('combined'));
app.use(express.json());
app.use(routes);
app.use('/uploads/fotos', express.static(path.join(__dirname, '..', 'uploads', 'fotos')));
app.use(errorHandler);

app.listen(PORT, () => console.log("Express iniciado..."));
