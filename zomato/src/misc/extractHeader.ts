import {Request, Response} from "express";

export function extractHeaderOrRespond(req: Request, res: Response, header: string): string {
    const headerValue = Object.keys(req.headers).find((key) => {
        return key.toLowerCase() === header.toLowerCase();
    });
    if (headerValue === undefined) {
        res.status(400).send(`Missing ${header} header`);
        return "";
    }
    return headerValue;
}