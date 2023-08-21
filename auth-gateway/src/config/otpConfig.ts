interface OtpConfig {
    expiryDuration: number,
    expiryCheckInterval: number,
    deleteOnExpiry: boolean,
    length: number,
}

export const otpConfig: OtpConfig = {
    expiryDuration: 5 * 60 * 1000, // 5 minutes
    expiryCheckInterval: 60 * 1000, // 1 minute
    deleteOnExpiry: true,
    length: 5,
}