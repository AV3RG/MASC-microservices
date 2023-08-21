import { Request, Response } from 'express';
import {cookieConfig} from "../../config/cookieConfig";
import {standardKeyVerify} from "../../auth/crypto/keySign";
import User from "../../model/doc/user";
import IUser, {addUsedRefreshToken} from "../../model/ts/IUser";
import {TokenPair} from "../../auth/tokenPair";
import {checkForTokenReuse} from "../../misc/auth";

export async function refreshTokenPair(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies || !cookies[cookieConfig.refreshTokenName]) res.sendStatus(401);
    const refreshToken = cookies[cookieConfig.refreshTokenName];
    const valid = await standardKeyVerify(refreshToken, res);
    if (!valid) return;
    const {username, uuid, iat} = <any>valid.payload
    if (!username || !uuid) {
        res.status(401).send("Invalid refresh token");
        return;
    }
    const reuseDetected = await checkForTokenReuse(res, uuid);
    if (reuseDetected) return;
    const userByName: IUser = await User.findOne({
        credentials: {
            username: username
        }
    })
    if (!userByName) {
        res.status(401).send("Invalid refresh token");
        return;
    }
    await addUsedRefreshToken(userByName, uuid, iat);
    const tokenPair = await TokenPair.generateNew(username);
    tokenPair.sendInResponse(res);
}

export default refreshTokenPair;