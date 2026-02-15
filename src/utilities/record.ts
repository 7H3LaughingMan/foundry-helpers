import { localeCompare } from "./string.js";

import * as R from "remeda";

export function sortByLocaleCompare<TRecord extends Record<string, unknown>>(list: TRecord[], key: keyof TRecord): void {
    list.sort((a, b) => localeCompare(String(a[key]), String(b[key])));
}

export function mapToObjectByKey<TRecord extends Record<string, unknown>, K extends ExtractKeys<TRecord, string>>(
    data: TRecord[],
    key: K
): Record<string, TRecord> {
    return R.indexBy(data, (value) => value[key] as string);
}

export function recordToSelectOptions(record: Record<string, string>): { value: string; label: string }[] {
    return R.pipe(
        record,
        R.entries(),
        R.map(([value, label]) => {
            return { value, label };
        })
    );
}
