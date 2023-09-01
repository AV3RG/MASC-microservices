import {Algorithm} from "jsonwebtoken";

interface CryptoConfig {
    algorithm: Algorithm,
    issuer: string,
    clockTolerance: number,
    accessTokenExpirationString: string,
    accessTokenExpirationNum: number,
    refreshTokenExpiration: string,
}

export const cryptoConfig: CryptoConfig = {
    algorithm: "HS256",
    issuer: "masc-auth-gateway",
    clockTolerance: 60,
    accessTokenExpirationString: "1h",
    accessTokenExpirationNum: 60 * 60,
    refreshTokenExpiration: "30d",
}