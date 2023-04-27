import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);


const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) 