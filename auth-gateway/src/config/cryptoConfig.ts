import {Algorithm} from "jsonwebtoken";

interface CryptoConfig {
    algorithm: Algorithm,
    issuer: string,
    clockTolerance: number,
    accessTokenExpiration: string,
    refreshTokenExpiration: string,
}

export const cryptoConfig: CryptoConfig = {
    algorithm: "HS256",
    issuer: "masc-auth-gateway",
    clockTolerance: 60,
    accessTokenExpiration: "1h",
    refreshTokenExpiration: "30d",
}