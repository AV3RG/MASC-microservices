interface EmailConfig {
    reLoginTemplate: string;
    firstRegisterTemplate: string;
    tokenReuseTemplate: string;
}

export const emailConfig: EmailConfig = {
    reLoginTemplate: "reLoginTemplate",
    firstRegisterTemplate: "firstRegisterTemplate",
    tokenReuseTemplate: "tokenReuseTemplate",
}