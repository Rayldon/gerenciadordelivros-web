export function getEntityId(entity: unknown): number | null {
  if (!entity || typeof entity !== 'object') return null;

  const safeEntity = entity as Record<string, unknown>;
  for (const [key, value] of Object.entries(safeEntity)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');

    if (
      normalizedKey === 'id' ||
      normalizedKey.endsWith('id') ||
      normalizedKey.startsWith('cod') ||
      normalizedKey.includes('codigo')
    ) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
      }
      if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) return parsed;
      }
    }
  }

  return null;
}
