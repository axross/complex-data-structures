import UnionFind from "./UnionFind";

describe("UnionFind", () => {
  describe("length returns number of unions", () => {
    test("#1", () => {
      const unionFind = new UnionFind(5);

      expect(unionFind.length).toBe(5);
    });

    test("#2", () => {
      const unionFind = new UnionFind(5);

      unionFind.unite(0, 1);
      unionFind.unite(1, 2);
      unionFind.unite(3, 4);

      expect(unionFind.length).toBe(2);
    });

    test("#3", () => {
      const unionFind = new UnionFind(5);

      unionFind.unite(0, 1);
      unionFind.unite(0, 2);
      unionFind.unite(0, 3);
      unionFind.unite(0, 4);

      expect(unionFind.length).toBe(1);
    });
  });

  describe("isUnited() returns if the given indexes are united", () => {
    test("#1", () => {
      const unionFind = new UnionFind(5);

      unionFind.unite(0, 1);
      unionFind.unite(0, 2);
      unionFind.unite(0, 3);
      unionFind.unite(0, 4);

      expect(unionFind.isUnited(0, 1)).toBeTruthy();
      expect(unionFind.isUnited(0, 2)).toBeTruthy();
      expect(unionFind.isUnited(0, 3)).toBeTruthy();
      expect(unionFind.isUnited(0, 4)).toBeTruthy();
      expect(unionFind.isUnited(1, 0)).toBeTruthy();
      expect(unionFind.isUnited(1, 2)).toBeTruthy();
      expect(unionFind.isUnited(1, 3)).toBeTruthy();
      expect(unionFind.isUnited(1, 4)).toBeTruthy();
      expect(unionFind.isUnited(2, 0)).toBeTruthy();
      expect(unionFind.isUnited(2, 1)).toBeTruthy();
      expect(unionFind.isUnited(2, 3)).toBeTruthy();
      expect(unionFind.isUnited(2, 4)).toBeTruthy();
      expect(unionFind.isUnited(3, 0)).toBeTruthy();
      expect(unionFind.isUnited(3, 1)).toBeTruthy();
      expect(unionFind.isUnited(3, 2)).toBeTruthy();
      expect(unionFind.isUnited(3, 4)).toBeTruthy();
      expect(unionFind.isUnited(4, 0)).toBeTruthy();
      expect(unionFind.isUnited(4, 1)).toBeTruthy();
      expect(unionFind.isUnited(4, 2)).toBeTruthy();
      expect(unionFind.isUnited(4, 3)).toBeTruthy();
    });

    test("#2", () => {
      const unionFind = new UnionFind(5);

      expect(unionFind.isUnited(0, 1)).toBeFalsy();
      expect(unionFind.isUnited(0, 2)).toBeFalsy();
      expect(unionFind.isUnited(0, 3)).toBeFalsy();
      expect(unionFind.isUnited(0, 4)).toBeFalsy();
      expect(unionFind.isUnited(1, 0)).toBeFalsy();
      expect(unionFind.isUnited(1, 2)).toBeFalsy();
      expect(unionFind.isUnited(1, 3)).toBeFalsy();
      expect(unionFind.isUnited(1, 4)).toBeFalsy();
      expect(unionFind.isUnited(2, 0)).toBeFalsy();
      expect(unionFind.isUnited(2, 1)).toBeFalsy();
      expect(unionFind.isUnited(2, 3)).toBeFalsy();
      expect(unionFind.isUnited(2, 4)).toBeFalsy();
      expect(unionFind.isUnited(3, 0)).toBeFalsy();
      expect(unionFind.isUnited(3, 1)).toBeFalsy();
      expect(unionFind.isUnited(3, 2)).toBeFalsy();
      expect(unionFind.isUnited(3, 4)).toBeFalsy();
      expect(unionFind.isUnited(4, 0)).toBeFalsy();
      expect(unionFind.isUnited(4, 1)).toBeFalsy();
      expect(unionFind.isUnited(4, 2)).toBeFalsy();
      expect(unionFind.isUnited(4, 3)).toBeFalsy();
    });

    test("#3", () => {
      const unionFind = new UnionFind(5);

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

  describe("unite()", () => {
    describe("unites the given indexes", () => {
      test("#1", () => {
        const unionFind = new UnionFind(5);

        unionFind.unite(0, 1);
        unionFind.unite(0, 2);
        unionFind.unite(3, 4);

        expect(unionFind["nodes"][0].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][1].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][2].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][3].parent).toBe(unionFind["nodes"][3]);
        expect(unionFind["nodes"][4].parent).toBe(unionFind["nodes"][3]);
      });

      test("#2", () => {
        const unionFind = new UnionFind(5);

        unionFind.unite(0, 1);
        unionFind.unite(0, 2);
        unionFind.unite(0, 3);
        unionFind.unite(0, 4);

        expect(unionFind["nodes"][0].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][1].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][2].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][3].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][4].parent).toBe(unionFind["nodes"][0]);
      });
    });

    describe("merges the smaller nodes into the larger one", () => {
      test("#1", () => {
        const unionFind = new UnionFind(5);

        unionFind.unite(0, 1);
        unionFind.unite(1, 2);
        unionFind.unite(2, 4);

        expect(unionFind["nodes"][0].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][1].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][2].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][3].parent).toBe(unionFind["nodes"][3]);
        expect(unionFind["nodes"][4].parent).toBe(unionFind["nodes"][0]);
      });

      test("#2", () => {
        const unionFind = new UnionFind(5);

        unionFind.unite(0, 1);
        unionFind.unite(1, 2);
        unionFind.unite(2, 3);
        unionFind.unite(3, 4);

        expect(unionFind["nodes"][0].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][1].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][2].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][3].parent).toBe(unionFind["nodes"][0]);
        expect(unionFind["nodes"][4].parent).toBe(unionFind["nodes"][0]);
      });
    });
  });
});
