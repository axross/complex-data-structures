export default class UnionFind {
  constructor(length: number, offset: number = 0) {
    for (let i = 0; i < length; ++i) {
      const node = { size: 1 };
      (node as any).parent = node;

      this.nodes[i + offset] = node as any;
    }
  }

  private nodes: UnionFindNode[] = [];

  get length(): number {
    return this.nodes.reduce((len, n) => (n.parent === n ? len + 1 : len), 0);
  }

  isUnited(a: number, b: number): boolean {
    return (
      this.getRepresentative(this.nodes[a]) ===
      this.getRepresentative(this.nodes[b])
    );
  }

  unite(a: number, b: number): void {
    const rootA = this.getRepresentative(this.nodes[a]);
    const rootB = this.getRepresentative(this.nodes[b]);
    let newRoot;
    let newChild;

    if (rootA.size >= rootB.size) {
      newRoot = rootA;
      newChild = rootB;
    } else {
      newRoot = rootB;
      newChild = rootA;
    }

    newChild.parent = newRoot;
    newRoot.size += newChild.size;
    newChild.size = 1;
  }

  private getRepresentative(node: UnionFindNode): UnionFindNode {
    if (node.parent === node) return node;

    node.parent = this.getRepresentative(node.parent);

    return node.parent;
  }
}

interface UnionFindNode {
  parent: UnionFindNode;
  size: number;
}
