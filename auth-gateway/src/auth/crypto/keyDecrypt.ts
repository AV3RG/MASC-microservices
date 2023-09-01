import jwt, {Jwt, VerifyOptions} from "jsonwebtoken";
import {CRYPTO_ENV} from "../../env/env";
import {Response} from "express";
import {cryptoConfig} from "../../config/cryptoConfig";

function invalidTokenHandler(res: Response) {
    res.status(401).send("Invalid refresh token");
}

export async function keyDecrypt(token: string, options: VerifyOptions): Promise<object> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, CRYPTO_ENV.PUBLIC_KEY, options, (err, payload) => {
            if (err) reject(err);
            else if (payload instanceof Object) resolve(payload);
            else reject("Invalid payload");
        });
    });
}


export async function standardKeyDecrypt(token: string, res: Response): Promise<Jwt> {
    return new Promise((resolve) => {
        keyDecrypt(token, {
            algorithms: [cryptoConfig.algorithm],
            issuer: cryptoConfig.issuer,
            clockTolerance: cryptoConfig.clockTolerance,
        }).catch((_) => {
            invalidTokenHandler(res)
            resolve(null);
        }).then((payload) => {
            if (payload instanceof Object) resolve(payload as Jwt);
            else {
                invalidTokenHandler(res);
                resolve(null);
            }
        });
    })
}