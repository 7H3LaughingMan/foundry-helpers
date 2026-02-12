import { ImageFilePath } from "foundry-types/common/constants.mjs";
import * as R from "remeda";
import { localize, LocalizeArgs } from "./localize.ts";

export class MODULE<TApi extends Record<string, unknown> = Record<string, unknown>> {
    static #instance: MODULE;
    static #current: foundry.packages.Module;

    #api = {} as TApi;
    #debug = {};
    #id: string;
    #globalName: string;

    constructor(id: string, globalName?: string) {
        this.#id = id;
        this.#globalName = globalName || id.replace(/-(\w)/g, (_substring, p1: string) => p1.toUpperCase());

        Hooks.once("init", () => {
            Object.defineProperty(game, this.#globalName, {
                value: this,
                configurable: false,
                enumerable: false,
                writable: false
            });
        });
    }

    static register(id: string, globalName?: string) {
        if (this.#instance) throw new Error("Module was already registered.");

        this.#instance = new MODULE(id, globalName);
    }

    static get id(): string {
        return this.#instance.#id;
    }

    static get current(): foundry.packages.Module {
        return (this.#current ??= game.modules.get(this.id)!);
    }

    static get name(): string {
        return this.current.title;
    }

    static get isDebug(): boolean {
        return !!(CONFIG.debug as Record<string, unknown>)[this.id];
    }

    static path(...path: string[]): string {
        return `${this.id}.${R.join(path, ".")}`;
    }

    static relativePath(...path: string[]): string {
        return `modules/${this.id}/${R.join(path, "/")}`;
    }

    static imagePath(...path: [...string[], CONST.ImageFilePath]): ImageFilePath {
        return this.relativePath("images", ...path) as ImageFilePath;
    }

    static templatePath(...path: [...string[], `${string}.hbs`]): `${string}.hbs` {
        return this.relativePath("templates", ...path) as `${string}.hbs`;
    }

    static Error(error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        return new Error(`\n[${this.name}] ${msg}`);
    }

    static error(...args: [...string[], string | Error]) {
        if (args.at(-1) instanceof Error) {
            const error = args.pop() as Error;
            args.push(error.message);
        }

        console.error(`[${this.name}]`, ...args);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    static apiExpose(path: string, object: Record<string, Function>, context?: unknown) {
        if (foundry.utils.hasProperty(this.#instance.api, path)) {
            throw this.Error(`The API path has already been defined: ${path}`);
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const exposed: Record<string, Function> = {};

        for (const [key, fn] of R.entries(object)) {
            Object.defineProperty(exposed, key, {
                value: context ? fn.bind(context) : fn,
                configurable: false,
                enumerable: false,
                writable: false
            });
        }

        foundry.utils.setProperty(this.#instance.#api, path, exposed);
    }

    static debugExpose(path: string, toExpose: unknown) {
        this.#instance.debugExpose(path, toExpose);
    }

    get api(): TApi {
        return this.#api;
    }

    get id(): string {
        return this.#id;
    }

    get active(): boolean {
        return MODULE.current.active;
    }

    debugExpose(path: string, toExpose: unknown) {
        if (foundry.utils.hasProperty(this.#debug, path)) {
            throw MODULE.Error(`The debug path has already been defined: ${path}`);
        }

        foundry.utils.setProperty(this.#debug, path, toExpose);
    }

    getSetting(...path: string[]) {
        return this.active ? game.settings.get(this.id, R.join(path, ".")) : undefined;
    }

    localize(...args: LocalizeArgs): string {
        return localize(...args);
    }
}
