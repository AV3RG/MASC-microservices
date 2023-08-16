const requiredEnvVariables = [
    //NODEMAILER
    "EMAIL_HOST",
    "EMAIL_PORT",
    "EMAIL_USER",
    "EMAIL_PASS",
    "EMAIL_FROM",
    //KAFKA
    "KAFKA_CLIENT_ID",
    "KAFKA_BROKERS",
]

const optionalEnvVariables: Map<string, string> = new Map()

export { requiredEnvVariables, optionalEnvVariables }