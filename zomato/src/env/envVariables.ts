const requiredEnvVariables = [
    //CRYPTO
    "PRIVATE_KEY",
    "PUBLIC_KEY",
    //KAFKA
    "CLIENT_ID",
    "BROKERS",
    //REDIS
    "REDIS_URLS",
]

const optionalEnvVariables: Map<string, string> = new Map()

export { requiredEnvVariables, optionalEnvVariables }