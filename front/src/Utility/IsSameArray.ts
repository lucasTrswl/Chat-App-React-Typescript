const JOIN = ";";

export default function IsSameArray<T>(listA: T[], listB: T[], uniqueIdentifier: (item: T) => string) {
    return listA.sort().map(uniqueIdentifier).join(JOIN) == listB.sort().map(uniqueIdentifier).join(JOIN)
}