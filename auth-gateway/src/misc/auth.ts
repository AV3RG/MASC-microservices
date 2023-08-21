import {Response} from "express";
import IUser, {clearRefreshTokens} from "../model/ts/IUser";
import User from "../model/doc/user";
import {sendTokenReuseEmail} from "../kafka/mailSender";
import {cookieConfig} from "../config/cookieConfig";

const checkForTokenReuse = async (res: Response, uuid: string): Promise<boolean> => {
    const userByToken: IUser = await User.findOne({
        credentials: {
            refreshTokens: {
                uuid: uuid
            }
        }
    })
    if (userByToken) {
        // Token reuse detected, invalidate all tokens and invalidate the user
        res.clearCookie(cookieConfig.refreshTokenName).sendStatus(204);
        await clearRefreshTokens(userByToken);
        await sendTokenReuseEmail(userByToken.email);
        return false;
    }
    return true;
}

export { checkForTokenReuse }