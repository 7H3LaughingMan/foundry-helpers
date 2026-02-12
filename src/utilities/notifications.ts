import * as R from "remeda";
import { localize, LocalizeArgs, LocalizeData } from "./localize.ts";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class Notifications extends Function {
    declare subkeys: string[];

    constructor(...subkeys: string[]) {
        super();

        this.subkeys = subkeys;

        function notify(type: NotificationType, ...args: NotificationArgs): foundry.applications.ui.Notification {
            const permanent = R.isBoolean(args.at(-1)) ? (args.pop() as boolean) : false;
            const message = localize(...subkeys, ...(args as LocalizeArgs));
            return foundry.ui.notifications.notify(message, type, { permanent });
        }

        Object.assign(notify, this);
        Object.setPrototypeOf(notify, Object.getPrototypeOf(this));

        return notify as Notifications;
    }

    success(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this("success", ...args);
    }

    info(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this("info", ...args);
    }

    warning(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this("warning", ...args);
    }

    error(...args: NotificationArgs): foundry.applications.ui.Notification {
        return this("error", ...args);
    }

    sub(...subkeys: string[]): Notifications {
        return new Notifications(...this.subkeys, ...subkeys);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface Notifications {
    (type: NotificationType, ...args: NotificationArgs): foundry.applications.ui.Notification;
}

type NotificationType = "info" | "warning" | "error" | "success";

export type NotificationArgs = LocalizeArgs | [...LocalizeArgs, string | LocalizeData | boolean];
export const notify = new Notifications();
export type { Notifications };
