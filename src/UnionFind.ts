export default class UnionFind<V> {
  private nodes: Map<V, UnionFindNode> = new Map();
  private unionLength: number = 0;

  get length(): number {
    return this.unionLength;
  }

  isUnited(a: V, b: V): boolean {
    return (
      this.getRoot(this.nodes.get(a)!) === this.getRoot(this.nodes.get(b)!)
    );
  }

  add(value: V): void {
    if (this.nodes.has(value)) throw new Error(`${value} already exists.`);

    const node = { size: 1 };
    (node as any).parent = node;

    this.nodes.set(value, node as any);
    this.unionLength += 1;
  }

  unite(a: V, b: V): void {
    const rootA = this.getRoot(this.getNode(a));
    const rootB = this.getRoot(this.getNode(b));

    if (rootA !== rootB) {
      const newRoot = rootA.size >= rootB.size ? rootA : rootB;
      const newChild = newRoot === rootA ? rootB : rootA;

      newChild.parent = newRoot;
      newRoot.size += newChild.size;
      newChild.size = 1;
      this.unionLength -= 1;
    }
  }

  private getNode(value: V): UnionFindNode {
    if (!this.nodes.has(value)) throw new Error(`${value} is not found.`);

    return this.nodes.get(value)!;
  }

  /**
   * gets the representative.
   * during that, do path compression
   */
  private getRoot(node: UnionFindNode): UnionFindNode {
    if (node.parent === node) return node;

    node.parent = this.getRoot(node.parent);

    return node.parent;
  }
}

interface UnionFindNode {
  parent: UnionFindNode;
  size: number;
}
