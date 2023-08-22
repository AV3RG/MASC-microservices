import * as process from "process";

export const CRYPTO_ENV = {
    "PRIVATE_KEY": process.env.PRIVATE_KEY,
    "PUBLIC_KEY": process.env.PUBLIC_KEY,
}

export const KAFKA_ENV = {
    "CLIENT_ID": process.env.CLIENT_ID,
    "BROKERS": process.env.BROKERS,
}

export const REDIS_ENV = {
    "REDIS_URLS": process.env.REDIS_URLS,
}