// DO NOT REMOVE THIS LINE
import 'dotenv/config'

import fs from 'fs';
import {optionalEnvVariables, requiredEnvVariables} from "./envVariables";

export default function verifyEnvFile() {
    //check if .env file is present
    if (!fs.existsSync('.env')) {
        console.error('No .env file found. Please create one.');
        process.exit(1);
    }

    //check if .env file has all the required variables
    requiredEnvVariables.forEach((envVariable) => {
        if (!process.env[envVariable]) {
            console.error(`Required environment variable ${envVariable} not found.`);
            process.exit(1);
        }
    })
    //warn if .env does not have any optional variable
    optionalEnvVariables.forEach((envVariable, defaultValue) => {
        if (!process.env[envVariable]) {
            console.warn(`Optional environment variable ${envVariable} not found. Using default value ${defaultValue}.`);
        }
    })
}