import { v4 } from 'uuid';

type InputBuffer = ArrayLike<number>

export function randomUUID(): string {
    return v4();
}

export function generateUUID(bytes: InputBuffer): string {
    return v4({ random: bytes });
}