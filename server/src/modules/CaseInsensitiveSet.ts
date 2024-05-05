export class CaseInsensitiveSet<T> extends Set<T> {
  add(value: T): this {
    if (typeof value === "string") {
      value = value.toLowerCase() as any as T;
    }
    return super.add(value);
  }
  has(value: T): boolean {
    if (typeof value === "string") {
      value = value.toLowerCase() as any as T;
    }
    return super.has(value);
  }
  delete(value: T): boolean {
    if (typeof value === "string") {
      value = value.toLowerCase() as any as T;
    }
    return super.delete(value);
  }
}
