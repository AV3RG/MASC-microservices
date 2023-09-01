interface CookieConfig {
    refreshTokenName: string,
    maxAge: number,
    httpOnly: boolean,
    secure: boolean,
    sameSite: boolean | "lax" | "strict" | "none"
}

export const cookieConfig: CookieConfig = {
    refreshTokenName: "masc-refresh-token",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    httpOnly: true,
    secure: true,
    sameSite: "strict",
}