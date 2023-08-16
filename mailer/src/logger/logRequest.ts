import {KafkaMessage} from "kafkajs";

export function logRequest(topic: string, partition: number, message: KafkaMessage) {
    console.log({
        topic,
        partition,
        message: message.value?.toString() || "NULL MESSAGE",
    });
}

export function logSuccess(to: string, template: string) {
    console.log(`Successfully sent mail to ${to} with template ${template}`);
}

export function logError(error: any) {
    console.error(error);
}