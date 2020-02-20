import UnionFind from "./UnionFind";

describe("UnionFind", () => {
  describe("#length", () => {
    it("returns number of unions", () => {
      const unionFind = new UnionFind();

      expect(unionFind.length).toBe(0);
      unionFind.add(0);
      unionFind.add(1);
      unionFind.add(2);
      expect(unionFind.length).toBe(3);
      unionFind.add(3);
      unionFind.unite(0, 2);
      expect(unionFind.length).toBe(3);
      unionFind.unite(2, 3);
      expect(unionFind.length).toBe(2);
    });
  });

  describe("#isUnited()", () => {
    it("returns if the given values are united", () => {
      const unionFind = new UnionFind();

      unionFind.add(0);
      unionFind.add(1);
      unionFind.add(2);
      unionFind.add(3);
      unionFind.add(4);
      unionFind.unite(0, 1);
      unionFind.unite(1, 2);
      unionFind.unite(3, 4);

      expect(unionFind.isUnited(0, 1)).toBeTruthy();
      expect(unionFind.isUnited(0, 2)).toBeTruthy();
      expect(unionFind.isUnited(0, 3)).toBeFalsy();
      expect(unionFind.isUnited(0, 4)).toBeFalsy();
      expect(unionFind.isUnited(1, 0)).toBeTruthy();
      expect(unionFind.isUnited(1, 2)).toBeTruthy();
      expect(unionFind.isUnited(1, 3)).toBeFalsy();
      expect(unionFind.isUnited(1, 4)).toBeFalsy();
      expect(unionFind.isUnited(2, 0)).toBeTruthy();
      expect(unionFind.isUnited(2, 1)).toBeTruthy();
      expect(unionFind.isUnited(2, 3)).toBeFalsy();
      expect(unionFind.isUnited(2, 4)).toBeFalsy();
      expect(unionFind.isUnited(3, 0)).toBeFalsy();
      expect(unionFind.isUnited(3, 1)).toBeFalsy();
      expect(unionFind.isUnited(3, 2)).toBeFalsy();
      expect(unionFind.isUnited(3, 4)).toBeTruthy();
      expect(unionFind.isUnited(4, 0)).toBeFalsy();
      expect(unionFind.isUnited(4, 1)).toBeFalsy();
      expect(unionFind.isUnited(4, 2)).toBeFalsy();
      expect(unionFind.isUnited(4, 3)).toBeTruthy();
    });
  });

  describe("#add()", () => {
    it("adds the given value", () => {
      const unionFind = new UnionFind();

      unionFind.add(0);
      expect(unionFind["nodes"].has(0)).toBeTruthy();
      unionFind.add(1);
      expect(unionFind["nodes"].has(1)).toBeTruthy();
      unionFind.add(2);
      expect(unionFind["nodes"].has(2)).toBeTruthy();
      unionFind.add(3);
      expect(unionFind["nodes"].has(3)).toBeTruthy();
      unionFind.add(4);
      expect(unionFind["nodes"].has(4)).toBeTruthy();
    });
  });

  describe("#unite()", () => {
    it("unites the given indexes", () => {
      const unionFind = new UnionFind();

      unionFind.add(0);
      unionFind.add(1);
      unionFind.add(2);
      unionFind.add(3);
      unionFind.add(4);
      unionFind.unite(0, 1);
      unionFind.unite(0, 2);
      unionFind.unite(3, 4);

      expect(unionFind["nodes"].get(0)!.parent).toBe(unionFind["nodes"].get(0));
      expect(unionFind["nodes"].get(1)!.parent).toBe(unionFind["nodes"].get(0));
      expect(unionFind["nodes"].get(2)!.parent).toBe(unionFind["nodes"].get(0));
      expect(unionFind["nodes"].get(3)!.parent).toBe(unionFind["nodes"].get(3));
      expect(unionFind["nodes"].get(4)!.parent).toBe(unionFind["nodes"].get(3));
    });

    describe("merges the smaller nodes into the larger one", () => {
      const unionFind = new UnionFind();

      unionFind.add(0);
      unionFind.add(1);
      unionFind.add(2);
      unionFind.add(3);
      unionFind.add(4);
      unionFind.unite(0, 1);
      unionFind.unite(2, 1);
      unionFind.unite(3, 4);

      expect(unionFind["nodes"].get(0)!.parent).toBe(unionFind["nodes"].get(0));
      expect(unionFind["nodes"].get(1)!.parent).toBe(unionFind["nodes"].get(0));
      expect(unionFind["nodes"].get(2)!.parent).toBe(unionFind["nodes"].get(0));
      expect(unionFind["nodes"].get(3)!.parent).toBe(unionFind["nodes"].get(3));
      expect(unionFind["nodes"].get(4)!.parent).toBe(unionFind["nodes"].get(3));
    });
  });

  // TODO: tests that getRoot() does path completion
  describe("private #getRoot()", () => {
    it.todo("performs path completion");
  });
});
