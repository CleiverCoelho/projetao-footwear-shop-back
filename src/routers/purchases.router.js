import { getPurchases, postPurchases } from "./purchases.controller";

const purchasesrouter = Router();

purchasesrouter.get('/purchases', getPurchases);
purchasesrouter.post('/purchases', validamodelo(purchasemodel), postPurchases);

export default purchasesrouter;