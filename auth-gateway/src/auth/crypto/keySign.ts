import jwt, {SignOptions} from "jsonwebtoken";
import {CRYPTO_ENV} from "../../env/env";


export async function keySign(dataPayload: object, options: SignOptions): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign(dataPayload, CRYPTO_ENV.PRIVATE_KEY, options, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        })
    })
}
