import { MODULE } from "./module";

export function settingPath(...path: string[]): string {
    return MODULE.path("settings", ...path);
}

export function getSetting<T = unknown>(key: string): T;
export function getSetting(key: string) {
    return game.settings.get(MODULE.id, key);
}

export function setSetting<T = unknown>(key: string, value: T): Promise<T>;
export function setSetting(key: string, value: unknown) {
    return game.settings.set(MODULE.id, key, value);
}
