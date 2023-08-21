import jwt, {Jwt, SignOptions, VerifyOptions} from "jsonwebtoken";
import {CRYPTO_ENV} from "../../env/env";
import {cryptoConfig} from "../../config/cryptoConfig";
import {Response} from "express";

function invalidTokenHandler(res: Response) {
    res.status(401).send("Invalid refresh token");
}

export async function keySign(dataPayload: object, options: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(dataPayload, CRYPTO_ENV.PRIVATE_KEY, options, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        })
    })
}

export async function keyVerify(token: string, options: VerifyOptions): Promise<object> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, CRYPTO_ENV.PUBLIC_KEY, options, (err, payload) => {
            if (err) reject(err);
            else if (payload instanceof Object) resolve(payload);
            else reject("Invalid payload");
        });
    });
}

export async function standardKeyVerify(token: string, res: Response): Promise<Jwt> {
    return new Promise((resolve) => {
        keyVerify(token, {
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