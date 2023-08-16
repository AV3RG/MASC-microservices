import * as process from "process";

export const MAIL_ENV = {
    "HOST": process.env.EMAIL_HOST,
    "PORT": process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
    "USERNAME": process.env.EMAIL_USER,
    "PASSWORD": process.env.EMAIL_PASS,
    "FROM": process.env.EMAIL_FROM,
}

export const KAFKA_ENV = {
    "CLIENT_ID": process.env.KAFKA_CLIENT_ID,
    "BROKERS": process.env.KAFKA_BROKERS,
}