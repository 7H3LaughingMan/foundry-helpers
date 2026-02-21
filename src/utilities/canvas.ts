import * as R from "remeda";

import AmbientLight = foundry.canvas.placeables.AmbientLight;
import AmbientSound = foundry.canvas.placeables.AmbientSound;
import Drawing = foundry.canvas.placeables.Drawing;
import MeasuredTemplate = foundry.canvas.placeables.MeasuredTemplate;
import Note = foundry.canvas.placeables.Note;
import PlaceableObject = foundry.canvas.placeables.PlaceableObject;
import Region = foundry.canvas.placeables.Region;
import Tile = foundry.canvas.placeables.Tile;
import Token = foundry.canvas.placeables.Token;
import Wall = foundry.canvas.placeables.Wall;

export function isPlaceableObject(value: unknown, embeddedName: "AmbientLight"): value is AmbientLight;
export function isPlaceableObject(value: unknown, embeddedName: "AmbientSound"): value is AmbientSound;
export function isPlaceableObject(value: unknown, embeddedName: "Drawing"): value is Drawing;
export function isPlaceableObject(value: unknown, embeddedName: "MeasuredTemplate"): value is MeasuredTemplate;
export function isPlaceableObject(value: unknown, embeddedName: "Note"): value is Note;
export function isPlaceableObject(value: unknown, embeddedName: "Region"): value is Region;
export function isPlaceableObject(value: unknown, embeddedName: "Tile"): value is Tile;
export function isPlaceableObject(value: unknown, embeddedName: "Token"): value is Token;
export function isPlaceableObject(value: unknown, embeddedName: "Wall"): value is Wall;
export function isPlaceableObject(value: unknown, embeddedName: string): boolean {
    return value instanceof PlaceableObject && (value.constructor as typeof PlaceableObject).embeddedName === embeddedName;
}

export function placeableObjectHasScene(value: Maybe<AmbientLight>): value is AmbientLight<AmbientLightDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<AmbientSound>): value is AmbientSound<AmbientSoundDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<Drawing>): value is Drawing<DrawingDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<MeasuredTemplate>): value is MeasuredTemplate<MeasuredTemplateDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<Note>): value is Note<NoteDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<Region>): value is Region<RegionDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<Tile>): value is Tile<TileDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<Token>): value is Token<TokenDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<Wall>): value is Wall<WallDocument<Scene>>;
export function placeableObjectHasScene(value: Maybe<PlaceableObject>): boolean {
    return R.isNonNullish(value?.scene);
}
