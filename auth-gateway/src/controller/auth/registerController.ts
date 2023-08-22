import User from "../../model/doc/user";
import { Request, Response } from "express";
import IUser from "../../model/ts/IUser";
import {hasOtp, validateOtp, deleteOtp} from "../../auth/otp/otpStore";
import {TokenPair} from "../../auth/tokenPair";
import {registerConfig} from "../../config/registerConfig";
import {otpConfig} from "../../config/otpConfig";

export async function registerNewUser(req: Request, res: Response) {
    const { username, otp, email } = req.body;
    if (!username || !otp || !email) {
        res.status(400).send("Missing username/otp/email");
        return;
    }
    const [valid, invalidMessage] = validityChecks(username, otp, email);
    if (!valid) {
        res.status(400).send(invalidMessage);
        return;
    }
    if (await checkForDuplicates(username)) {
        res.status(409).send("Username already taken");
        return;
    }
    if (!hasOtp(username)) {
        res.status(401).send("OTP expired or hasn't been generated yet");
        return;
    }
    const validOtp = validateOtp(username, otp)
    if (!validOtp) {
        res.status(401).send("Invalid OTP");
        return;
    }
    try {
        const tokenPair = await TokenPair.generateNew(username)
        const newUser: IUser = createUserDocument(
            username,
            email
        );
        await newUser.save();
        deleteOtp(username);
        tokenPair.sendInResponse(res)
    } catch (err) {
        res.status(500).send("Internal server error");
    }
}

function validityChecks(username: string, otp: string, email: string): [boolean, string] {
    if (username.toLowerCase() !== username) return [false, "Username must be lowercase"];
    const userSizeMin = registerConfig.usernameMinLength;
    const userSizeMax = registerConfig.usernameMaxLength;
    if (username.length < userSizeMin || username.length > userSizeMax) return [false, `Username must be between ${userSizeMin} and ${userSizeMax} characters long`];
    if (!username.match(RegExp(registerConfig.usernameRegex))) {
        return [false, "Username must be in the format of: [a-z]+\\.[0-9]{9}"];
    }
    if (otp.length !== otpConfig.length) return [false, `OTP must be ${otpConfig.length} characters long`];
    if (!email.match(RegExp(registerConfig.emailRegex))) return [false, "Invalid email format"];
    return [true, ""];
}

async function checkForDuplicates(username: string): Promise<boolean> {
    const possibleDuplicate = await User.findOne({username: username}).exec();
    return possibleDuplicate !== null;
}

function createUserDocument(
    username: string,
    email: string
): IUser {
    return <IUser>new User({
        credentials: {
            username: username,
            refreshTokens: undefined
        },
        email: email
    })
}
