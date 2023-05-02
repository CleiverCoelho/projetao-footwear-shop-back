
import { postPurchases } from "../controllers/purchases.controller.js";
import { purchaseSchema } from "../schemas/purchaseSchema.js";
import { Router } from "express";
import { validamodelo } from "../middlewares/universal.middleware.js";
const purchasesrouter = Router();


purchasesrouter.post('/purchases', validamodelo(purchaseSchema), postPurchases);

export default purchasesrouter;