import nodemailer from 'nodemailer';
import {MAIL_ENV} from "../env/env";

const mailer = nodemailer.createTransport({
    host: MAIL_ENV.HOST,
    port: MAIL_ENV.PORT,
    auth: {
        user: MAIL_ENV.USERNAME,
        pass: MAIL_ENV.PASSWORD,
    }
});

export default mailer;