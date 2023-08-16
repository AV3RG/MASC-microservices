import fs from "fs";

interface TemplateData {
    template: string,
    from: string | null,
    subject: string,
}

const templates = {
    "otp": {
        template: "./templates/otp.html",
        subject: "OTP",
        from: null,
    },
    "reuseDetected": {
        template: "./templates/reuseDetected.html",
        subject: "REUSE DETECTED",
        from: null
    },
} as const

const templateMap = new Map<string, TemplateData>();
Object.keys(templates).forEach((key) => {
    const obj = templates[key as keyof typeof templates];
    templateMap.set(key, {
        template: fs.readFileSync(obj.template, "utf8"),
        from: obj.from,
        subject: obj.subject,
    });
})

export { templateMap };