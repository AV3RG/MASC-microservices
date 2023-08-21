import jwt, {VerifyOptions} from "jsonwebtoken";
import {CRYPTO_ENV} from "../../env/env";

export async function keyDecrypt(token: string, options: VerifyOptions): Promise<object> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, CRYPTO_ENV.PUBLIC_KEY, options, (err, payload) => {
            if (err) reject(err);
            else if (payload instanceof Object) resolve(payload);
            else reject("Invalid payload");
        });
    });
}