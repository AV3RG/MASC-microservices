import {Kafka} from "kafkajs";
import {KAFKA_ENV} from "../env/env";

const kafka = new Kafka({
    clientId: KAFKA_ENV.CLIENT_ID,
    brokers: KAFKA_ENV.BROKERS.split(","),
})

export default kafka;