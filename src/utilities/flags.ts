import * as R from "remeda";
import { MODULE } from "./module";

import Document = foundry.abstract.Document;

export function getFlag<T>(document: Document, ...path: string[]): T | undefined {
    return document.getFlag(MODULE.id, R.join(path, ".")) as T | undefined;
}

export function setFlag<TDocument extends Document, T>(document: TDocument, ...args: [...string[], T]): Promise<TDocument> {
    const value = args.pop() as T;
    return document.setFlag(MODULE.id, R.join(args as string[], "."), value);
}

export function unsetFlag<TDocument extends Document>(document: TDocument, ...path: string[]): Promise<TDocument | undefined> {
    return document.unsetFlag(MODULE.id, R.join(path, "."));
}

export function flagPath(...path: string[]): string {
    return `flags.${MODULE.path(...path)}`;
}

export function unsetFlagPath(...path: [string, ...string[]]): string {
    const lastKey = path.pop();
    return flagPath(...path, `-=${lastKey}`);
}

export function getFlagProperty<T>(object: object, ...path: string[]): T | undefined {
    return foundry.utils.getProperty(object, flagPath(...path)) as T | undefined;
}

export function setFlagProperty<TObject extends object, T>(object: TObject, ...args: [...string[], T]): TObject {
    const value = args.pop() as T;
    foundry.utils.setProperty(object, flagPath(...(args as string[])), value);
    return object;
}

export function unsetFlagProperty<TObject extends object>(object: TObject, ...path: [string, ...string[]]): TObject {
    foundry.utils.setProperty(object, unsetFlagPath(...path), null);
    return object;
}

export function deleteFlagProperty<TObject extends object>(object: TObject, ...path: string[]): TObject {
    foundry.utils.deleteProperty(object, flagPath(...path));
    return object;
}
