import NodeCache from "node-cache";
import {otpConfig} from "../../config/otpConfig";

const otpCache = new NodeCache({
    stdTTL: otpConfig.expiryDuration,
    checkperiod: otpConfig.expiryCheckInterval,
    deleteOnExpire: otpConfig.deleteOnExpiry,
})

export function addExpiringOtp(username: string, otp: string): boolean {
    const set: boolean = otpCache.set(username, otp);
    if (!set) console.error(`Failed to set OTP for ${username}`);
    return set;
}

export function validateOtp(username: string, otp: string): boolean {
    const storedOtp = otpCache.get(username);
    if (storedOtp === undefined) return false;
    return storedOtp === otp;
}

export function hasOtp(username: string): boolean {
    return otpCache.has(username);
}

export function deleteOtp(username: string): boolean {
    const deleted: number = otpCache.del(username);
    if (deleted == 0) console.error(`Failed to delete OTP for ${username}. Probably there was no otp to delete`);
    return deleted != 0;
}