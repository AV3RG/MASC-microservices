import {Router} from "express";
import {handleLogout} from "../controller/auth/logoutController";
import {refreshTokenPair} from "../controller/auth/refreshTokenController";
import {onboardUser} from "../controller/auth/onboardingController";
import {registerNewUser} from "../controller/auth/registerController";

const authRouter = Router();
authRouter.get("/logout", handleLogout);
authRouter.get("/refresh", refreshTokenPair)
authRouter.post('/onboard', onboardUser)
authRouter.post('/register', registerNewUser)

export default authRouter;