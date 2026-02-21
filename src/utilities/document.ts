import * as R from "remeda";

import Document = foundry.abstract.Document;

export function isDocumentType(value: unknown, documentName: "ActiveEffect"): value is ActiveEffect;
export function isDocumentType(value: unknown, documentName: "Actor"): value is Actor;
export function isDocumentType(value: unknown, documentName: "ActorDelta"): value is ActorDelta;
export function isDocumentType(value: unknown, documentName: "Adventure"): value is Adventure;
export function isDocumentType(value: unknown, documentName: "AmbientLight"): value is AmbientLightDocument;
export function isDocumentType(value: unknown, documentName: "AmbientSound"): value is AmbientSoundDocument;
export function isDocumentType(value: unknown, documentName: "Card"): value is Card;
export function isDocumentType(value: unknown, documentName: "Cards"): value is Cards;
export function isDocumentType(value: unknown, documentName: "ChatMessage"): value is ChatMessage;
export function isDocumentType(value: unknown, documentName: "Combat"): value is Combat;
export function isDocumentType(value: unknown, documentName: "Combatant"): value is Combatant;
export function isDocumentType(value: unknown, documentName: "CombatantGroup"): value is CombatantGroup;
export function isDocumentType(value: unknown, documentName: "Drawing"): value is DrawingDocument;
export function isDocumentType(value: unknown, documentName: "FogExploration"): value is FogExploration;
export function isDocumentType(value: unknown, documentName: "Folder"): value is Folder;
export function isDocumentType(value: unknown, documentName: "Item"): value is Item;
export function isDocumentType(value: unknown, documentName: "JournalEntry"): value is JournalEntry;
export function isDocumentType(value: unknown, documentName: "JournalEntryCategory"): value is JournalEntryCategory;
export function isDocumentType(value: unknown, documentName: "JournalEntryPage"): value is JournalEntryPage;
export function isDocumentType(value: unknown, documentName: "Macro"): value is Macro;
export function isDocumentType(value: unknown, documentName: "MeasuredTemplate"): value is MeasuredTemplateDocument;
export function isDocumentType(value: unknown, documentName: "Note"): value is NoteDocument;
export function isDocumentType(value: unknown, documentName: "Playlist"): value is Playlist;
export function isDocumentType(value: unknown, documentName: "PlaylistSound"): value is PlaylistSound;
export function isDocumentType(value: unknown, documentName: "Region"): value is RegionDocument;
export function isDocumentType(value: unknown, documentName: "RegionBehavior"): value is RegionBehavior;
export function isDocumentType(value: unknown, documentName: "RollTable"): value is RollTable;
export function isDocumentType(value: unknown, documentName: "Scene"): value is Scene;
export function isDocumentType(value: unknown, documentName: "Setting"): value is Setting;
export function isDocumentType(value: unknown, documentName: "TableResult"): value is TableResult;
export function isDocumentType(value: unknown, documentName: "Tile"): value is TileDocument;
export function isDocumentType(value: unknown, documentName: "Token"): value is TokenDocument;
export function isDocumentType(value: unknown, documentName: "User"): value is User;
export function isDocumentType(value: unknown, documentName: "Wall"): value is WallDocument;
export function isDocumentType(value: unknown, documentName: string): boolean {
    return value instanceof Document && value.documentName === documentName;
}

export function documentHasParent(value: Maybe<ActiveEffect>): value is ActiveEffect<Actor | Item>;
export function documentHasParent(value: Maybe<Actor>): value is Actor<TokenDocument>;
export function documentHasParent(value: Maybe<ActorDelta>): value is ActorDelta<TokenDocument>;
export function documentHasParent(value: Maybe<AmbientLightDocument>): value is AmbientLightDocument<Scene>;
export function documentHasParent(value: Maybe<AmbientSoundDocument>): value is AmbientSoundDocument<Scene>;
export function documentHasParent(value: Maybe<Combatant>): value is Combatant<Combat>;
export function documentHasParent(value: Maybe<CombatantGroup>): value is CombatantGroup<Combat>;
export function documentHasParent(value: Maybe<DrawingDocument>): value is DrawingDocument<Scene>;
export function documentHasParent(value: Maybe<Item>): value is Item<Actor>;
export function documentHasParent(value: Maybe<JournalEntryCategory>): value is JournalEntryCategory<JournalEntry>;
export function documentHasParent(value: Maybe<JournalEntryPage>): value is JournalEntryPage<JournalEntry>;
export function documentHasParent(value: Maybe<MeasuredTemplateDocument>): value is MeasuredTemplateDocument<Scene>;
export function documentHasParent(value: Maybe<NoteDocument>): value is NoteDocument<Scene>;
export function documentHasParent(value: Maybe<PlaylistSound>): value is PlaylistSound<Playlist>;
export function documentHasParent(value: Maybe<RegionDocument>): value is RegionDocument<Scene>;
export function documentHasParent(value: Maybe<RegionBehavior>): value is RegionBehavior<RegionDocument>;
export function documentHasParent(value: Maybe<TableResult>): value is TableResult<RollTable>;
export function documentHasParent(value: Maybe<TileDocument>): value is TileDocument<Scene>;
export function documentHasParent(value: Maybe<TokenDocument>): value is TokenDocument<Scene>;
export function documentHasParent(value: Maybe<WallDocument>): value is WallDocument<Scene>;
export function documentHasParent(value: Maybe<Document>): boolean {
    return R.isNonNullish(value?.parent);
}
