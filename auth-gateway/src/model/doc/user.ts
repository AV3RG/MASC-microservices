import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import IUser from "../ts/IUser";

const refreshTokenSchema: Schema = new Schema({
    uuid: {
        type: Schema.Types.UUID,
        required: true,
    },
    expiry: {
        type: Date,
        required: true,
    }
})

const CredentialsSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    refreshTokens: {
        type: [refreshTokenSchema],
        required: true,
    }
})

const userSchema: Schema = new Schema({
    credentials: {
        type: CredentialsSchema,
        required: true
    },
    email: {
        type: String,
        required: true,
    }
})

export default mongoose.model<IUser>("User", userSchema);