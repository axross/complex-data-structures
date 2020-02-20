import PriorityQueue from "./PriorityQueue";

describe("Priority Queue", () => {
  it("can be min-heap", () => {
    const minHeap = new PriorityQueue<number>((a, b) => a - b);

    for (const num of [6, 1, 8, 3, 4, 7, 2, 5, 9]) {
      minHeap.push(num);
    }

    expect(minHeap.pop()).toBe(1);
    expect(minHeap.pop()).toBe(2);
    expect(minHeap.pop()).toBe(3);
    expect(minHeap.pop()).toBe(4);
    expect(minHeap.pop()).toBe(5);
    expect(minHeap.pop()).toBe(6);
    expect(minHeap.pop()).toBe(7);
    expect(minHeap.pop()).toBe(8);
    expect(minHeap.pop()).toBe(9);
  });

  it("can be max-heap", () => {
    const maxHeap = new PriorityQueue<number>((a, b) => b - a);

    for (const num of [6, 1, 8, 3, 4, 7, 2, 5, 9]) {
      maxHeap.push(num);
    }

    expect(maxHeap.pop()).toBe(9);
    expect(maxHeap.pop()).toBe(8);
    expect(maxHeap.pop()).toBe(7);
    expect(maxHeap.pop()).toBe(6);
    expect(maxHeap.pop()).toBe(5);
    expect(maxHeap.pop()).toBe(4);
    expect(maxHeap.pop()).toBe(3);
    expect(maxHeap.pop()).toBe(2);
    expect(maxHeap.pop()).toBe(1);
  });

  it("can be custom object heap", () => {
    const champions = [
      { name: "Annie", age: 11 },
      { name: "Braum", age: 32 },
      { name: "Caitlyn", age: 28 },
      { name: "Darius", age: 36 },
      { name: "Ezreal", age: 20 },
      { name: "Fiora", age: 27 },
      { name: "Gangplank", age: 33 },
      { name: "Heimerdinger", age: 102 },
      { name: "Irelia", age: 24 }
    ];
    const customHeap = new PriorityQueue<{ name: string; age: number }>(
      (a, b) => b.age - a.age
    );

    for (const champion of champions) {
      customHeap.push(champion);
    }

    expect(customHeap.pop()).toEqual({ name: "Heimerdinger", age: 102 });
    expect(customHeap.pop()).toEqual({ name: "Darius", age: 36 });
    expect(customHeap.pop()).toEqual({ name: "Gangplank", age: 33 });
    expect(customHeap.pop()).toEqual({ name: "Braum", age: 32 });
    expect(customHeap.pop()).toEqual({ name: "Caitlyn", age: 28 });
    expect(customHeap.pop()).toEqual({ name: "Fiora", age: 27 });
    expect(customHeap.pop()).toEqual({ name: "Irelia", age: 24 });
    expect(customHeap.pop()).toEqual({ name: "Ezreal", age: 20 });
    expect(customHeap.pop()).toEqual({ name: "Annie", age: 11 });
  });

  describe("#head", () => {
    it("returns the head value", () => {
      const minHeap = new PriorityQueue<number>((a, b) => a - b);

      for (const num of [6, 1, 8, 3, 4, 7, 2, 5, 9]) {
        minHeap.push(num);
      }

      expect(minHeap.head).toBe(minHeap.pop());
    });

    it("returns undefined if there's no value", () => {
      const minHeap = new PriorityQueue<number>((a, b) => a - b);

      expect(minHeap.head).toBe(undefined);
    });
  });

  describe("#pop()", () => {
    it("returns the max value and removes it", () => {
      const minHeap = new PriorityQueue<number>((a, b) => a - b);

      for (const num of [6, 1, 8, 3, 4, 7, 2, 5, 9]) {
        minHeap.push(num);
      }

      expect(minHeap.head).toBe(1);
      expect(minHeap.pop()).toBe(1);
      expect(minHeap.head).toBe(2);

      const oneValueHeap = new PriorityQueue<number>((a, b) => a - b);

      oneValueHeap.push(1);
      expect(oneValueHeap.head).toBe(1);
      expect(oneValueHeap.pop()).toBe(1);
      expect(oneValueHeap.head).toBe(undefined);
    });

    it("returns undefined when there's no value", () => {
      const heap = new PriorityQueue<number>((a, b) => a - b);

      expect(heap.pop()).toBe(undefined);
    });
  });

  it("#push() adds values", () => {
    const maxHeap = new PriorityQueue<number>((a, b) => b - a);

    for (const num of [6, 1, 8, 3, 4, 7, 2, 5, 9]) {
      maxHeap.push(num);
    }

    maxHeap.push(0);
    expect(maxHeap["tree"]).toContain(0);
    maxHeap.push(10);
    expect(maxHeap["tree"]).toContain(10);
  });
});
