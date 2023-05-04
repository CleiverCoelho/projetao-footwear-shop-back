import { Router } from "express";
import { editUser, getUserData, postRequests, signIn, signUp } from "../controllers/auth.controller.js";
import { validamodelo } from "../middlewares/universal.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

const authRouter = Router();
authRouter.post("/sign-up", validamodelo(signUpSchema), signUp);
authRouter.post("/sign-in", validamodelo(signInSchema), signIn);
authRouter.get("/user", getUserData);
authRouter.put("/user", validamodelo(signUpSchema), editUser);
authRouter.post("/user", postRequests)

export default authRouter;