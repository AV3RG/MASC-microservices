import {SignOptions} from "jsonwebtoken";
import {cryptoConfig} from "../config/cryptoConfig";
import {keySign} from "./crypto/keySign";
import {Response} from "express";

const accessTokenSignOptions: SignOptions = {
    algorithm: cryptoConfig.algorithm,
    issuer: cryptoConfig.issuer,
    expiresIn: cryptoConfig.accessTokenExpirationString,
} as const

export class Token {
    private readonly accessToken: string;
    private readonly username: string;
    private readonly id: string;

    constructor(accessToken: string, username: string, id: string) {
        this.accessToken = accessToken;
        this.username = username;
        this.id = id;
    }

    static async generateNew(username: string, id: string): Promise<Token> {
        const accessToken = await keySign({ username, id }, accessTokenSignOptions);
        return new Token(accessToken, username, id);
    }

    public sendInResponse(res: Response) {
        res.status(201)
            .send({
                accessToken: this.accessToken,
            });
    }

}
