import kafka from "./kafkaClient";
import {logError, logRequest, logSuccess} from "../logger/logRequest";
import mailer from "../mail/mailer";
import {MAIL_ENV} from "../env/env";
import {templateMap} from "../config/mailConfig";

function setParams(template: string, params: any) {
    Object.keys(params).forEach((key) => {
        template = template.replace(`{{__${key}__}}`, params[key])
    })
    return template;
}

export async function setupKafkaListener() {
    const consumer = kafka.consumer({
        groupId: "mailer",
    })
    await consumer.connect();
    await consumer.subscribe({
        topic: "mailer",
        fromBeginning: true,
    })
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            logRequest(topic, partition, message);
            if (!message.value) return;
            const { to, template, params } = JSON.parse(message.value.toString());
            const templateData = templateMap.get(template);
            if (!templateData) {
                logError(`Received invalid template on\ntopic: ${topic}\npartition: ${partition}`)
                return;
            }
            mailer.sendMail({
                from: MAIL_ENV.FROM,
                to: to,
                subject: templateData.subject,
                html: setParams(templateData.template, params),
            }).then(() => {
                logSuccess(to, template);
            }).catch((err) => {
                logError(err);
            })
        }
    })
}