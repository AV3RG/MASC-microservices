import { Request, Response } from "express";
import {addExpiringOtp, hasOtp} from "../../auth/otp/otpStore";
import {generateOtp} from "../../auth/otp/generateOtp";
import {otpConfig} from "../../config/otpConfig";
import User from "../../model/doc/user";
import {sendFirstRegisterEmail, sendReLoginEmail} from "../../kafka/mailSender";

export async function onboardUser(req: Request, res: Response) {
    const { email, username } = req.body;
    if (!email || !username) {
        res.status(400).send("Missing email/username");
        return;
    }
    if (await isAlreadyRegistered(email)) {
        if (hasOtp(username)) {
            res.status(400).send("OTP already generated");
            return;
        }
        const otp = generateOtp(otpConfig.length)
        addExpiringOtp(username, otp)
        await sendReLoginEmail(email, otp)
        res.status(204).send();
    }
    const otp = generateOtp(otpConfig.length)
    addExpiringOtp(username, otp)
    await sendFirstRegisterEmail(email, otp)
    res.status(204).send();
}

async function isAlreadyRegistered(email: string): Promise<boolean> {
    const match = await User.findOne({
        email: email
    })
    return match !== null;
}