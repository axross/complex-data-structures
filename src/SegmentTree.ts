export type AssociateFunc<V> = (a: V, b: V) => V;
export type UpdateFunc<V> = (prev: V) => V;

export default class SegmentTree<V> {
  constructor(values: V[], identity: V, associate: AssociateFunc<V>) {
    this.valueLength = values.length;
    this.identity = identity;
    this.associate = associate;

    if (values.length === 0) {
      this.tree = [];
    } else {
      const treeLength = 2 ** Math.ceil(Math.log2(values.length)) * 2 - 1;
      const tree = [];

      for (let i = 0; i <= treeLength >> 1; ++i) {
        tree[(treeLength >> 1) + i] = i < values.length ? values[i] : identity;
      }

      for (let i = (treeLength >> 1) - 1; i >= 0; --i) {
        tree[i] = associate(tree[i * 2 + 1], tree[i * 2 + 2]);
      }

      this.tree = tree;
    }
  }

  private tree: V[];
  private identity: V;
  private associate: AssociateFunc<V>;
  private valueLength: number;

  get length(): number {
    return this.valueLength;
  }

  getAt(i: number): V {
    return this.tree[i + (this.tree.length >> 1)];
  }

  queryIn(from: number, to: number): V {
    let result = this.identity;
    const stack: [number, number, number][] = [
      [0, 0, (this.tree.length >> 1) + 1]
    ];

    while (stack.length > 0) {
      const [i, coverFrom, coverTo] = stack.pop()!;

      // when perfect covering
      if (coverFrom >= from && coverTo <= to) {
        result = this.associate(result, this.tree[i]);

        continue;
      }

      // when out of the range
      if (coverFrom >= to || coverTo < from) continue;
      // when referring the leaf node
      if (i > this.tree.length >> 1) continue;

      // drill down to the children otherwise
      stack.push(
        [i * 2 + 1, coverFrom, (coverFrom + coverTo) >> 1],
        [i * 2 + 2, (coverFrom + coverTo) >> 1, coverTo]
      );
    }

    return result;
  }

  setAt(i: number, value: V): void {
    const treeIndex = i + (this.tree.length >> 1);

    // console.log("set:", i, value);

    this.tree[treeIndex] = value;

    // console.log("actl:", treeIndex);

    let parent = (treeIndex - 1) >> 1;

    while (parent >= 0) {
      // console.log("prnt:", parent);

      this.tree[parent] = this.associate(
        this.tree[parent * 2 + 1],
        this.tree[parent * 2 + 2]
      );

      // Math.floor(parent / 2);
      parent = (parent - 1) >> 1;
    }
  }
}
