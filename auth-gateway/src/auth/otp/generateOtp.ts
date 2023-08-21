const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));
const numbers = Array.from(Array(10).keys());
const validChars = [...alphabet, ...numbers];
const validCharsLength = validChars.length;

export function generateOtp(length: number): string {
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += validChars[Math.floor(Math.random() * validCharsLength)];
    }
    return otp;
}
