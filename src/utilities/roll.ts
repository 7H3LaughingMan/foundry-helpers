import { Rolled } from "@7h3laughingman/foundry-types/client/dice/roll.mjs";

import * as R from "remeda";

export function isRoll(value: unknown): value is Roll {
    return R.isNonNullish(value) && value instanceof Roll;
}

export function isRolledRoll(value: unknown): value is Rolled<Roll> {
    return isRoll(value) && value._evaluated === true;
}
