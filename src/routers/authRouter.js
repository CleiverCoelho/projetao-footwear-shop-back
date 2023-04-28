import { Router } from "express";
import { getUserData, signIn, signUp } from "../controllers/auth.controller.js";
import { schemaValidation} from "../middlewares/schemaValidation.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", schemaValidation(signUpSchema), signUp);
authRouter.post("/sign-in", schemaValidation(signInSchema), signIn);
authRouter.get("/user", getUserData);

export default authRouter;