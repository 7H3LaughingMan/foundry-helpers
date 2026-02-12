export function getCurrentUser(): User {
    return game.user ?? game.data.users.find((value) => value._id === game.userId);
}

export function userIsGM(user: User = getCurrentUser()): boolean {
    return user && user.role >= CONST.USER_ROLES.ASSISTANT;
}

export function getPrimaryUpdater(actor: Actor): User | null {
    const { activeGM } = game.users;
    if (activeGM) return activeGM;

    const primaryPlayer = actor.isToken ? null : game.users.getDesignatedUser((user) => user.active && user.character === actor);
    if (primaryPlayer) return primaryPlayer;

    return game.users.getDesignatedUser((user) => actor.canUserModify(user, "update"));
}

export function isPrimaryUpdater(actor: Actor, user: User = getCurrentUser()): boolean {
    return getPrimaryUpdater(actor) === user;
}

export function primaryPlayerOwner(actor: Actor): User | null {
    const assigned = game.users.getDesignatedUser((user) => user.active && user.character === actor);

    return assigned ?? game.users.getDesignatedUser((user) => user.active && !user.isGM && actor.testUserPermission(user, "OWNER"));
}

export function isPrimaryOwner(actor: Actor, user: User = getCurrentUser()): boolean {
    return user.isGM || primaryPlayerOwner(actor) === user;
}
