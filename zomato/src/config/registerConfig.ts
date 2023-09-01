interface RegisterConfig {
    usernameMinLength: number,
    usernameMaxLength: number,
    usernameRegex: string,
    emailRegex: string,
}

export const registerConfig: RegisterConfig = {
    usernameMinLength: 5,
    usernameMaxLength: 50,
    usernameRegex: "[a-z]+\\.[0-9]{9}",
    emailRegex: "[a-z]+\\.[0-9]{9}\\@muj\\.manipal\\.edu",
}