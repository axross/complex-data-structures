# Complex Data Structures

Useful snippets of complex data structures for algorithm contests

- 🔋 Battery-included
- 🗜 Minified with [Terser](https://terser.org/)
- 🛠 Super Flexible (but not fastest)
- ⛑ Well Tested

## Usage

**Copy and paste** into the editor.

### Priority Queue

```js
// https://github.com/axross/complex-data-structures
// new PriorityQueue(values, compare)
//     priorityQueue.head
//     priorityQueue.pop()
//     priorityQueue.push(value)
//     priorityQueue.length
<%=PriorityQueue>
```

### Segment Tree

```js
// https://github.com/axross/complex-data-structures
// new SegmentTree(values, identity, associate)
//     segmentTree.getAt(i)
//     segmentTree.queryIn(from, to)
//     segmentTree.setAt(i, value)
//     segmentTree.length
<%=SegmentTree>
```

### Union Find / Disjoint Set

```js
// https://github.com/axross/complex-data-structures
// new UnionFind()
//     unionFind.add(value)
//     unionFind.isUnited(a, b)
//     unionFind.unite(a, b)
//     unionFind.length
<%=UnionFind>
```

## API

- [`new PriorityQueue(compare)`](#new-priorityqueuevalues-compare)
  - [`priorityQueue.head`](#priorityqueuehead)
  - [`priorityQueue.pop()`](#priorityqueuepop)
  - [`priorityQueue.push(value)`](#priorityqueuepushvalue)
  - [`priorityQueue.length`](#priorityqueuelength)
- [`new SegmentTree(values, identity, associate)`](#new-segmenttreevalues-identity-associate)
  - [`segmentTree.getAt(i)`](#segmenttreegetati)
  - [`segmentTree.queryIn(from, to)`](#segmenttreequeryinfrom-to)
  - [`segmentTree.setAt(i, value)`](#segmenttreesetati-value)
  - [`segmentTree.length`](#segmenttreelength)
- [`new UnionFind()`](#new-unionfind)
  - [`unionFind.add(value)`](#unionfindaddvalue)
  - [`unionFind.isUnited(a, b)`](#unionfindisuniteda-b)
  - [`unionFind.unite(a, b)`](#unionfindunitea-b)
  - [`unionFind.length`](#unionfindlength)

### `new PriorityQueue(values, compare)`

Creates a [priority queue data structure](https://en.wikipedia.org/wiki/Priority_queue).

`compare` is a function to specify priority comparison strategy. This function should works in the exact same way with [`Array#sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

**Usage Example**

```js
// LeetCode 1046. Last Stone Weight
// https://leetcode.com/problems/last-stone-weight/
const stones = [2, 7, 4, 1, 8, 1];

// push all stones in the queue
for (const stone of stones) {
  maxHeap.push(stone);
}

// prioritize bigger numbers
const maxHeap = new PriorityQueue((a, b) => b - a);

while (maxHeap.length > 1) {
  // takes two stones and smashes them together
  const [a, b] = [maxHeap.pop(), maxHeap.pop()];
  const diff = Math.abs(a - b);

  // if either one stone bigger, push it to the queue
  if (diff !== 0) {
    maxHeap.push(diff);
  }
}

// the answer is the survivor stone, otherwise 0
maxHeap.head ?? 0;
```

#### `priorityQueue.head`

Returns the head value in O(1) time. Returns `undefined` if `priorityQueue.length === 0`.

#### `priorityQueue.pop()`

Removes the head value and reutrns it. This method takes O(log n) time. The same as [`priorityQueue.head`](#priorityqueuehead), returns `undefined` if `priorityQueue.length === 0`.

#### `priorityQueue.push(value)`

Adds `value` and sorts it to place proper position using [`compare`](#new-priorityqueuevalues-compare) function. This operation takes O(log n) time.

#### `priorityQueue.length`

Returns the length of queue in O(1) time.

### `new SegmentTree(values, identity, associate)`

Creates a [segment tree data structure](https://en.wikipedia.org/wiki/Segment_tree) from the given `values`, `identity` and `associate` function.

`identity` is supposed to be [identity element](https://en.wikipedia.org/wiki/Identity_element). Identity element is a value that doesn't change the result of `associate` function. For example, what you query is the minimum number, identity element is `Infinity`.

To construct a segment tree, it takes O(2n-1) time.

**Usage Example**

```js
// LeetCode 307. Range Sum Query - Mutable
// https://leetcode.com/problems/range-sum-query-mutable/
const nums = [5, 0, 7, 2, 3, 6, 1, 4, 8];
const rangeSum = new SegmentTree(
  values,

  // 0 is identity element because it doesn't change the result of a + b
  0,

  // how to resolve querying
  // this time, we want to get the sum of all numbers in the range
  (a, b) => a + b
);

// get the sum of numbers in the range [2, 5)
// equivalant to `values.slice(2, 5).reduce((sum, num) => sum + num, 0)`
rangeSum.queryIn(2, 5); // => 12

// update values, equivalant to `values[3] = -1`
rangeSum.setAt(3, -1);

// you can query values in mutable operations
rangeSum.queryIn(2, 5); // => 9
```

#### `segmentTree.getAt(i)`

Returns the value at the `i` position in O(1) time.

#### `segmentTree.queryIn(from, to)`

Returns the value in the range `from` and `to` (`to` is exlusive) along [`associate`](#new-segmenttreevalues-identity-associate) function. Equivalant to `values.slice(from, to).reduce((acc, val) => associate(acc, val), identity)` but takes only O(log n) time.

#### `segmentTree.setAt(i, value)`

Sets the `value` at `i` position. This operation takes O(log n) time.

#### `segmentTree.length`

Returns the length of values in O(1) time.

### `new UnionFind(length)`

Creates a [union-find (disjoint-set) data structure](https://en.wikipedia.org/wiki/Disjoint-set_data_structure). It takes O(n) time.

**Usage Example**

```js
// LeetCode 1319. Number of Operations to Make Network Connected
// https://leetcode.com/problems/number-of-operations-to-make-network-connected/
const n = 6;
const connections = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 3]
];
const unionFind = new UnionFind();

for (let i = 0; i < n; ++i) {
  unionFind.add(i);
}

for (const [a, b] of connections) {
  unionFind.unite(a, b);
}

// the answer is number of unions of connected computers - 1.
// but the answer is -1 (impossible to connects every computers)
// if number of connections is less than number of computers - 1
// because number of connections is number of cables we can use
connections.length >= n - 1 ? unionFind.length - 1 : -1;
```

#### `unionFind.isUnited(a, b)`

Returns `true` if the given `a` and `b` is united, `false` otherwise. It takes O(α(n)) time.

#### `unionFind.add(value)`

Adds `value` as a new unite in O(1) time.

#### `unionFind.unite(a, b)`

Unites the given `a` and `b`. It takes O(α(n)) time.

#### `unionFind.length`

Returns number of unions in the union find tree in O(1) time. As long as no `unite()` is called, the return value is the same with the `length` at constructor.

## License

[MIT](LICENSE)
