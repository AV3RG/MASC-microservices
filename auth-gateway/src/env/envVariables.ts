const requiredEnvVariables = [
    //CRYPTO
    "PRIVATE_KEY",
    "PUBLIC_KEY",
    //KAFKA
    "CLIENT_ID",
    "BROKERS",
]

const optionalEnvVariables: Map<string, string> = new Map()

export { requiredEnvVariables, optionalEnvVariables }