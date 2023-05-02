import { postPurchases } from "./purchases.controller.js";
import { purchaseSchema } from "../schemas/purchaseSchema.js";

const purchasesrouter = Router();


purchasesrouter.post('/purchases', validamodelo(purchaseSchema), postPurchases);

export default purchasesrouter;