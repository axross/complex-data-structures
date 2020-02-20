type CompareFunc<V> = (a: V, b: V) => number;

export default class PriorityQueue<V> {
  constructor(compare: CompareFunc<V>) {
    this.tree = [];
    this.compare = compare;
  }

  private tree: V[];
  private compare: CompareFunc<V>;

  get length(): number {
    return this.tree.length;
  }

  get head(): V | void {
    return this.tree.length > 0 ? this.tree[0] : undefined;
  }

  pop(): V | void {
    if (this.length <= 1) {
      return this.tree.shift();
    }

    const head = this.head;
    this.tree[0] = this.tree.pop()!;
    let i = 0;

    while (i < this.tree.length) {
      const left = i * 2 + 1;
      const right = i * 2 + 2;
      let topPrty = i;

      if (
        left < this.tree.length &&
        this.compare(this.tree[left], this.tree[topPrty]) < 0
      ) {
        topPrty = left;
      }

      if (
        right < this.tree.length &&
        this.compare(this.tree[right], this.tree[topPrty]) < 0
      ) {
        topPrty = right;
      }

      if (i === topPrty) break;

      [this.tree[i], this.tree[topPrty]] = [this.tree[topPrty], this.tree[i]];
      i = topPrty;
    }

    return head;
  }

  push(value: V): void {
    this.tree.push(value);

    let i = this.tree.length - 1;

    while (i > 0) {
      const parent = (i - 1) >> 1;

      if (this.compare(this.tree[i], this.tree[parent]) >= 0) break;

      [this.tree[i], this.tree[parent]] = [this.tree[parent], this.tree[i]];
      i = parent;
    }
  }
}
