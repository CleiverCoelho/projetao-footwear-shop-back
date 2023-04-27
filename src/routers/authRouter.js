import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { schemaValidation} from "../middlewares/schemaValidation.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", schemaValidation(signUpSchema), signUp);
authRouter.post("/sign-in", schemaValidation(signInSchema), signIn);

export default authRouter;