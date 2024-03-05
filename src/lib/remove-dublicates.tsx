// удаление последних дубликатов
export function removeDuplicateFields<TItem>(
  data: TItem[],
  field: keyof TItem
): TItem[] {
  const uniqueIds = new Set<TItem[typeof field]>();
  const uniqueObjects = [];

  for (let i = 0; i < data.length; i++) {
    if (!uniqueIds.has(data[i][field])) {
      uniqueIds.add(data[i][field]);
      uniqueObjects.push(data[i]);
    }
  }

  return uniqueObjects;
}
