import verifyEnvFile from "./env/verifyEnvFile";
import {setupKafkaListener} from "./kafka/kafkaListener";

verifyEnvFile()
setupKafkaListener()