import { postPurchases } from "./purchases.controller";
import { purchaseSchema } from "../schemas/purchaseSchema";

const purchasesrouter = Router();


purchasesrouter.post('/purchases', validamodelo(purchaseSchema), postPurchases);

export default purchasesrouter;