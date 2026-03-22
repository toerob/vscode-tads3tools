export class CaseInsensitiveMap<K, V> {
  private _inner = new Map<string, V>();

  set(key: K, value: V) {
    return this._inner.set((key as unknown as string).toLowerCase(), value), this;
  }
  get(key: K) {
    return this._inner.get((key as unknown as string).toLowerCase());
  }
  has(key: K) {
    return this._inner.has((key as unknown as string).toLowerCase());
  }
  delete(key: K) {
    return this._inner.delete((key as unknown as string).toLowerCase());
  }
  get size() {
    return this._inner.size;
  }
  keys(): IterableIterator<string> {
    return this._inner.keys();
  }
  values(): IterableIterator<V> {
    return this._inner.values();
  }
  entries(): IterableIterator<[string, V]> {
    return this._inner.entries();
  }
  forEach(callbackfn: (value: V, key: string, map: Map<string, V>) => void, thisArg?: any) {
    this._inner.forEach(callbackfn, thisArg);
  }
  clear() {
    this._inner.clear();
  }
  [Symbol.iterator]() {
    return this._inner[Symbol.iterator]();
  }
}