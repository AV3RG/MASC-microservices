import kafka from "./kafkaClient";

const producer = kafka.producer();

export async function setupProducer() {
    await producer.connect();
}

export default producer;