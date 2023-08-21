import producer from "./kafkaProducer";
import {emailConfig} from "../config/emailConfig";

export async function sendReLoginEmail(email: string, otp: string) {
    return await producer.send({
        topic: "mailer",
        messages: [{
            value: JSON.stringify({
                to: email,
                template: emailConfig.reLoginTemplate,
                params: {
                    otp: otp
                }
            })
        }]
    })
}

export async function sendFirstRegisterEmail(email: string, otp: string) {
    return await producer.send({
        topic: "mailer",
        messages: [{
            value: JSON.stringify({
                to: email,
                template: emailConfig.firstRegisterTemplate,
                params: {
                    otp: otp
                }
            })
        }]
    })
}

export async function sendTokenReuseEmail(email: string) {
    return await producer.send({
        topic: "mailer",
        messages: [{
            value: JSON.stringify({
                to: email,
                template: emailConfig.tokenReuseTemplate,
                params: null
            })
        }]
    })
}