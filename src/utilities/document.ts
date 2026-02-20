export function isDocumentType<K extends keyof DocumentTypeMap>(value: unknown, name: K): value is DocumentTypeMap[K] {
    return value instanceof getDocumentClass(name);
}
