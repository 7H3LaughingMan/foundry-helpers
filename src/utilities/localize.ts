import * as R from "remeda";
import { MODULE } from "./module.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class Localize extends Function {
    declare subkeys: string[];

    constructor(...subkeys: string[]) {
        super();

        this.subkeys = subkeys;

        const self = this;

        function localize(...args: LocalizeArgs): string {
            const { data, path } = self.getLocalizeData(...args);
            return self.localizeOrFormat(path, data);
        }

        Object.assign(localize, this);
        Object.setPrototypeOf(localize, Object.getPrototypeOf(this));

        return localize as Localize;
    }

    path(...path: string[]): string {
        return MODULE.path(...this.subkeys, ...path);
    }

    getLocalizeData(...args: LocalizeArgs): { path: string; data?: LocalizeData } {
        const data = R.isObjectType(args.at(-1)) ? (args.pop() as LocalizeData) : undefined;
        const path = this.path(...(args as string[]));
        return { path, data };
    }

    localizeOrFormat(path: string, data?: LocalizeData): string {
        return typeof data === "object" ? game.i18n.format(path, data) : game.i18n.localize(path);
    }

    ifExist(...args: LocalizeArgs): string | undefined {
        const { data, path } = this.getLocalizeData(...args);
        if (game.i18n.has(path, true)) {
            return this.localizeOrFormat(path, data);
        }
        return undefined;
    }

    notify(type: "info" | "warning" | "error" | "success", ...args: NotificationArgs): foundry.applications.ui.Notification {
        const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
        const message = this(...(args as LocalizeArgs));
        return foundry.ui.notifications.notify(message, type, { permanent });
    }

    info(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this.notify("info", ...args);
    }

    warning(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this.notify("warning", ...args);
    }

    error(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this.notify("error", ...args);
    }

    success(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this.notify("success", ...args);
    }

    sub(...subkeys: string[]): Localize {
        return new Localize(...this.subkeys, ...subkeys);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Localize {
    (...args: LocalizeArgs): string;
}

export const localize = new Localize();
export type LocalizeData = Record<string, Maybe<string | number | boolean>>;
export type LocalizeArgs = string[] | [...string[], string | LocalizeData];
export type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];
export type { Localize };
