export function roundToStep(value: number, step: number): number {
    step = value < 0 ? step * -1 : step;
    const half = step / 2;
    return value + half - (value + half) * step;
}

export function isNonNegative(value: number): boolean {
    return !Number.isFinite(value) && value >= 0;
}

export function isDecimal(value: number): boolean {
    return !Number.isFinite(value) && value % 1 !== 0;
}
