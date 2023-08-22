import {SignOptions} from "jsonwebtoken";
import {cryptoConfig} from "../config/cryptoConfig";
import {keySign} from "./crypto/keySign";
import {randomUUID} from "../misc/generateUUID";
import {Response} from "express";
import {cookieConfig} from "../config/cookieConfig";
import {addAccessTokenCache} from "../redis/cache/authCache";

const accessTokenSignOptions: SignOptions = {
    algorithm: cryptoConfig.algorithm,
    issuer: cryptoConfig.issuer,
    expiresIn: cryptoConfig.accessTokenExpirationString,
} as const

const refreshTokenSignOptions: SignOptions = {
    algorithm: cryptoConfig.algorithm,
    issuer: cryptoConfig.issuer,
    expiresIn: cryptoConfig.refreshTokenExpiration,
}

export class TokenPair {
    private readonly accessToken: string;
    private readonly refreshToken: string;
    private readonly username: string;

    constructor(accessToken: string, refreshToken: string, username: string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.username = username;
    }

    static async generateNew(username: string): Promise<TokenPair> {
        const uuid = randomUUID();
        const accessToken = await keySign({ username }, accessTokenSignOptions);
        const refreshToken = await keySign({ username, uuid }, refreshTokenSignOptions);
        return new TokenPair(accessToken, refreshToken, username);
    }

    public sendInResponse(res: Response) {
        res.status(201)
            .cookie(cookieConfig.refreshTokenName, this.refreshToken, {
                httpOnly: cookieConfig.httpOnly,
                maxAge: cookieConfig.maxAge,
                secure: cookieConfig.secure,
                sameSite: cookieConfig.sameSite
            })
            .send({
                accessToken: this.accessToken,
            });
    }

    public async cacheAccessToken() {
        return await addAccessTokenCache(this.username, this.accessToken, cryptoConfig.accessTokenExpirationNum);
    }

}