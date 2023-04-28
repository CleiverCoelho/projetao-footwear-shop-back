import { postPurchases } from "./purchases.controller";

const purchasesrouter = Router();


purchasesrouter.post('/purchases', validamodelo(purchasemodel), postPurchases);

export default purchasesrouter;