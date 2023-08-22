import {createCluster} from "redis";
import {REDIS_ENV} from "../env/env";
import {RedisClusterClientOptions} from "@redis/client/dist/lib/cluster";

const rootNodes: Array<RedisClusterClientOptions> = []

REDIS_ENV.REDIS_URLS.split(",").forEach((val) => {
    rootNodes.push({
        url: val
    })
})

const redisCluster = createCluster({
    rootNodes: rootNodes
})

async function setupCluster() {
    await redisCluster.connect()
}

export default redisCluster;