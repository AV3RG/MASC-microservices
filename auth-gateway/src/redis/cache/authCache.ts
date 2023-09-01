import redisCluster from "../redisCluster";

export async function addAccessTokenCache(username: string, accessToken: string, expiry: number) {
    return await redisCluster.set(`access_token_${username}`, accessToken, {"EX": expiry});
}

export async function getCachedAccessToken(username: string) {
    return await redisCluster.get(`access_token_${username}`);
}