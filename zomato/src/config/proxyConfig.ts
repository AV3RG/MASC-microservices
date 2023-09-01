interface ProxyConfig {
    proxies: Array<Proxy>
}

interface Proxy {
    pathRegex: string,
    target: string,
    authRequired: boolean,
}

export const proxyConfig: ProxyConfig = {
    proxies: [
        {
            pathRegex: "/event/.*",
            target: "http://localhost:3001",
            authRequired: false,
        },
    ]
}