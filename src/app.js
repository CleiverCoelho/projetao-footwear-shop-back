import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import cartRouter from "./routers/cart.router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(cartRouter);


const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) 