import express from "express";
import cors from "cors";
import authRouter from "./routers/authRouter.js";
import productsrouter from "./routers/products.router.js";
import purchasesrouter from "./routers/purchases.router.js";
import { Router } from "express";

const app = express();

app.use(cors());
app.use(express.json());


const router = Router();
router.use(authRouter);
router.use(productsrouter);
router.use(purchasesrouter);
app.use(Router);


const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`)) 