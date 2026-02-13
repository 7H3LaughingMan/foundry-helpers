import { Module } from "foundry-types/client/packages/_module.mjs";
import { ImageFilePath } from "foundry-types/common/constants.mjs";
import * as R from "remeda";
import { localize } from "./localize.ts";
import { getSetting } from "./settings.ts";

class CustomModule {
    #api: Record<string, unknown> = {};
    #current?: Module;
    #debug: Record<string, unknown> = {};
    #globalName: string = "";
    #id?: string;

    get id(): string {
        if (!this.#id) throw new Error("Module needs to be registered.");
        return this.#id;
    }

    get current(): Module {
        return (this.#current ??= game.modules.get(this.id)!);
    }

    get name(): string {
        return this.current.title;
    }

    get isDebug(): boolean {
        return foundry.utils.getProperty(CONFIG, `debug.${this.id}`) === true;
    }

    register(id: string, globalName?: string) {
        if (this.#id) throw new Error("Module has already been registered.");

        this.#id = id;
        this.#globalName = globalName || id.replace(/-(\w)/g, (_, p1: string) => p1.toUpperCase());

        Hooks.once("init", () => {
            const self = this;
            const context = {};

            Object.defineProperties(context, {
                active: {
                    get(): boolean {
                        return self.current.active;
                    },
                    configurable: false,
                    enumerable: false
                },
                api: {
                    get() {
                        return self.#api;
                    },
                    configurable: false,
                    enumerable: false
                },
                debug: {
                    get() {
                        return self.#debug;
                    },
                    configurable: false,
                    enumerable: false
                },
                getSetting: {
                    value: function (setting: string): unknown {
                        return self.current.active ? getSetting(setting) : undefined;
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                },
                localize: {
                    value: localize.sub(id),
                    configurable: false,
                    enumerable: false,
                    writable: false
                }
            });

            Object.defineProperty(game, this.#globalName, {
                value: context,
                configurable: false,
                enumerable: false,
                writable: false
            });
        });
    }

    globalPath(...path: string[]): string {
        return `${this.#globalName}.${R.join(path, ".")}`;
    }

    path(...path: string[]): string {
        return `${this.id}.${R.join(path, ".")}`;
    }

    relativePath(...path: string[]): string {
        return `modules/${this.id}/${R.join(path, "/")}`;
    }

    imagePath(...path: [...string[], ImageFilePath]): ImageFilePath {
        return this.relativePath(...path) as ImageFilePath;
    }

    templatePath(...path: [...string[], `${string}.hbs`]): string {
        return this.relativePath(...path);
    }

    Error(message: string): Error {
        return new Error(`\n[${this.name}] ${message}`);
    }

    error(input: string, error?: unknown) {
        let message = `[${this.name}] ${input}`;

        if (error instanceof Error) {
            message += `\n${error.message}`;
        } else if (typeof error === "string") {
            message += `\n${error}`;
        }

        console.error(message);
    }

    apiExpose(key: string, toExpose: Record<string, unknown>) {
        if (foundry.utils.hasProperty(this.#api, key)) throw this.Error(`The API key "${key}" has already been defined.`);

        const exposed = foundry.utils.deepClone(toExpose);

        Object.freeze(exposed);
        Object.defineProperty(this.#api, key, {
            value: exposed,
            configurable: false,
            enumerable: false,
            writable: false
        });
    }

    debugExpose(key: string, toExpose: unknown) {
        if (foundry.utils.hasProperty(this.#debug, key)) throw this.Error(`The debug key "${key}" has already been defined.`);

        const exposed = foundry.utils.deepClone(toExpose);

        Object.freeze(exposed);
        Object.defineProperty(this.#debug, key, {
            value: exposed,
            configurable: false,
            enumerable: false,
            writable: false
        });
    }
}

export const MODULE = new CustomModule();
