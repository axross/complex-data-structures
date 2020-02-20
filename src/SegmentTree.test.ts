import SegmentTree from "./SegmentTree";

describe("Segment Tree", () => {
  const nums = [5, 0, 7, 2, 3, 6, 1, 4, 8].map(e => 2 ** e);
  const rangeMin = new SegmentTree(nums, Infinity, (a, b) => Math.min(a, b));

  describe("new SegmentTree()", () => {
    it("creates a segment tree with the given nums", () => {
      expect(rangeMin["tree"]).toEqual([
        1,
        1,
        256,
        1,
        2,
        256,
        Infinity,
        1,
        4,
        8,
        2,
        256,
        Infinity,
        Infinity,
        Infinity,
        32,
        1,
        128,
        4,
        8,
        64,
        2,
        16,
        256,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity
      ]);
    });
  });

  describe("#length", () => {
    it("returns the value length", () => {
      expect(rangeMin.length).toBe(nums.length);
    });
  });

  describe("getAt()", () => {
    it("returns the value at the given index", () => {
      expect(rangeMin.getAt(0)).toBe(nums[0]);
      expect(rangeMin.getAt(1)).toBe(nums[1]);
      expect(rangeMin.getAt(2)).toBe(nums[2]);
      expect(rangeMin.getAt(3)).toBe(nums[3]);
      expect(rangeMin.getAt(4)).toBe(nums[4]);
      expect(rangeMin.getAt(5)).toBe(nums[5]);
      expect(rangeMin.getAt(6)).toBe(nums[6]);
      expect(rangeMin.getAt(7)).toBe(nums[7]);
      expect(rangeMin.getAt(8)).toBe(nums[8]);
    });
  });

  describe("queryIn()", () => {
    it("returns an associated value in the given range", () => {
      for (let from = 0; from < nums.length; ++from) {
        for (let to = from + 1; to <= nums.length; ++to) {
          const expected = Math.min(...nums.slice(from, to));

          expect(rangeMin.queryIn(from, to)).toBe(expected);
        }
      }
    });

    describe("setAt()", () => {
      const rangeSum = new SegmentTree(nums, 0, (a, b) => a + b);

      it("sets the value at the index and updates its ancestors", () => {
        rangeSum.setAt(0, 2 ** 9);

        const exNums = [...nums];
        exNums[0] = 2 ** 9;

        for (let from = 0; from < exNums.length; ++from) {
          for (let to = from + 1; to <= exNums.length; ++to) {
            const ex = exNums.slice(from, to).reduce((sum, n) => sum + n, 0);

            expect(rangeSum.queryIn(from, to)).toBe(ex);
          }
        }
      });
    });
  });
});
