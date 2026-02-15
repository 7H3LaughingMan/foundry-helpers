export function stringBoolean(value: boolean | string): `${boolean}` {
    return String(value) as `${boolean}`;
}

export function stringNumber(value: number | string): `${number}` {
    return String(value) as `${number}`;
}

export function localeCompare(a: string, b: string): number {
    return a.localeCompare(b, game.i18n.lang);
}
