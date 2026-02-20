type PlaceableObjectMap = {
    AmbientLight: typeof foundry.canvas.placeables.AmbientLight;
    AmbientSound: typeof foundry.canvas.placeables.AmbientSound;
    Drawing: typeof foundry.canvas.placeables.Drawing;
    MeasuredTemplate: typeof foundry.canvas.placeables.MeasuredTemplate;
    Note: typeof foundry.canvas.placeables.Note;
    Region: typeof foundry.canvas.placeables.Region;
    Tile: typeof foundry.canvas.placeables.Tile;
    Token: typeof foundry.canvas.placeables.Token;
    Wall: typeof foundry.canvas.placeables.Wall;
};

export function isPlaceableObject<K extends keyof PlaceableObjectMap>(value: unknown, type: K): value is PlaceableObjectMap[K] {
    return (
        value instanceof foundry.canvas.placeables.PlaceableObject &&
        (value.constructor as typeof foundry.canvas.placeables.PlaceableObject).embeddedName === type
    );
}
