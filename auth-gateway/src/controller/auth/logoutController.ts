import {Request, Response} from "express";
import {cookieConfig} from "../../config/cookieConfig";
import User from "../../model/doc/user";
import IUser, {addUsedRefreshToken} from "../../model/ts/IUser";
import moment from "moment";
import {checkForTokenReuse} from "../../misc/auth";
import {cryptoConfig} from "../../config/cryptoConfig";
import {standardKeyDecrypt} from "../../auth/crypto/keyDecrypt";

export async function handleLogout (req: Request, res: Response) {
    const cookies = req.cookies;
    const cookieName = cookieConfig.refreshTokenName;
    if (!cookies || !cookies[cookieName]) res.status(204);
    const refreshToken = cookies[cookieName];
    const valid = await standardKeyDecrypt(refreshToken, res);
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
        // User not found, let him log out
        res.clearCookie(cookieName).sendStatus(204);
    }
    await addUsedRefreshToken(userByName, uuid, moment(iat).add(cryptoConfig.refreshTokenExpiration).toDate())
    res.clearCookie(cookieName)
        .sendStatus(204);
}
