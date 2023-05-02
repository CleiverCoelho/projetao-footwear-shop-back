import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import productsrouter from "./routers/products.router.js";
import purchasesrouter from "./routers/purchases.router.js";
import { Router } from "express";
import cartRouter from "./routers/cart.router.js";
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const router = Router();
router.use(authRouter);
router.use(productsrouter);
router.use(purchasesrouter);
router.use(cartRouter);
app.use(router)



app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`)) 