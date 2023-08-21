import {Document} from "mongoose";

export default interface IUser extends Document {
    credentials: {
        username: string,
        refreshTokens: [{
            uuid: string,
            expiry: Date,
        }]
    },
    email: string,
}

export async function addUsedRefreshToken(user: IUser, uuid: string, expiry: Date) {
    return user.updateOne({
        credentials: {
            refreshTokens: {
                $addToSet: {
                    uuid: uuid,
                    expiry: expiry
                }
            }
        }
    });
}

export async function clearRefreshTokens(user: IUser) {
    return user.updateOne({
        credentials: {
            refreshTokens: []
        }
    })
}