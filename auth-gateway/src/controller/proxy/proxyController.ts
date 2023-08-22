import {NextFunction, Request, Response} from "express";
import proxy from "express-http-proxy";
import {standardKeyVerify} from "../../auth/crypto/keySign";
import {proxyConfig} from "../../config/proxyConfig";

export async function proxyIncoming(req: Request, res: Response, next: NextFunction) {
    const target = getProxyTarget(req.path);
    if (!checkAuthRequirement(req.path)) {
        await proxy(target, {})(req, res, next);
        return;
    }
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader || authHeader instanceof Array) {
        res.status(401).send("Missing authorization header");
        return;
    }
    if (!authHeader.startsWith("Bearer ")) {
        res.status(401).send("Invalid authorization header");
        return;
    }
    const token = authHeader.slice(7);
    const valid = await standardKeyVerify(token, res);
    if (!valid) return;
    await proxy(target, {})(req, res, next);
}

function getProxyTarget(path: string): string {
    const proxy = proxyConfig.proxies.filter(proxy => RegExp(proxy.pathRegex).test(path)).pop();
    if (!proxy) throw new Error("No proxy found for path: " + path);
    return proxy.target;
}

function checkAuthRequirement(path: string): boolean {
    const proxy = proxyConfig.proxies.filter(proxy => RegExp(proxy.pathRegex).test(path)).pop();
    if (!proxy) throw new Error("No proxy found for path: " + path);
    return proxy.authRequired;
}