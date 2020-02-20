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
class PriorityQueue{constructor(t){this.tree=[],this.compare=t}get length(){return this.tree.length}get head(){return this.tree.length>0?this.tree[0]:void 0}pop(){if(this.length<=1)return this.tree.shift();const t=this.head;this.tree[0]=this.tree.pop();let e=0;for(;e<this.tree.length;){const t=2*e+1,r=2*e+2;let h=e;if(t<this.tree.length&&this.compare(this.tree[t],this.tree[h])<0&&(h=t),r<this.tree.length&&this.compare(this.tree[r],this.tree[h])<0&&(h=r),e===h)break;[this.tree[e],this.tree[h]]=[this.tree[h],this.tree[e]],e=h}return t}push(t){this.tree.push(t);let e=this.tree.length-1;for(;e>0;){const t=e-1>>1;if(this.compare(this.tree[e],this.tree[t])>=0)break;[this.tree[e],this.tree[t]]=[this.tree[t],this.tree[e]],e=t}}}
```

### Segment Tree

```js
// https://github.com/axross/complex-data-structures
// new SegmentTree(values, identity, associate)
//     segmentTree.getAt(i)
//     segmentTree.queryIn(from, to)
//     segmentTree.setAt(i, value)
//     segmentTree.length
class SegmentTree{constructor(t,e,s){if(this.valueLength=t.length,this.identity=e,this.associate=s,0===t.length)this.tree=[];else{const h=2**Math.ceil(Math.log2(t.length))*2-1,i=[];for(let s=0;s<=h>>1;++s)i[(h>>1)+s]=s<t.length?t[s]:e;for(let t=(h>>1)-1;t>=0;--t)i[t]=s(i[2*t+1],i[2*t+2]);this.tree=i}}get length(){return this.valueLength}getAt(t){return this.tree[t+(this.tree.length>>1)]}queryIn(t,e){let s=this.identity;const h=[[0,0,1+(this.tree.length>>1)]];for(;h.length>0;){const[i,r,n]=h.pop();r>=t&&n<=e?s=this.associate(s,this.tree[i]):r>=e||n<t||i>this.tree.length>>1||h.push([2*i+1,r,r+n>>1],[2*i+2,r+n>>1,n])}return s}setAt(t,e){const s=t+(this.tree.length>>1);this.tree[s]=e;let h=s-1>>1;for(;h>=0;)this.tree[h]=this.associate(this.tree[2*h+1],this.tree[2*h+2]),h=h-1>>1}}
```

### Union Find / Disjoint Set

```js
// https://github.com/axross/complex-data-structures
// new UnionFind()
//     unionFind.add(value)
//     unionFind.isUnited(a, b)
//     unionFind.unite(a, b)
//     unionFind.length
class UnionFind{constructor(){this.nodes=new Map,this.unionLength=0}get length(){return this.unionLength}isUnited(t,e){return this.getRoot(this.nodes.get(t))===this.getRoot(this.nodes.get(e))}add(t){if(this.nodes.has(t))throw new Error(`${t} already exists.`);const e={size:1};e.parent=e,this.nodes.set(t,e),this.unionLength+=1}unite(t,e){const n=this.getRoot(this.getNode(t)),s=this.getRoot(this.getNode(e));if(n!==s){const t=n.size>=s.size?n:s,e=t===n?s:n;e.parent=t,t.size+=e.size,e.size=1,this.unionLength-=1}}getNode(t){if(!this.nodes.has(t))throw new Error(`${t} is not found.`);return this.nodes.get(t)}getRoot(t){return t.parent===t?t:(t.parent=this.getRoot(t.parent),t.parent)}}
```

## API

- [`new PriorityQueue(values, compare)`](#new-priorityqueuevalues-compare)
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

Creates a [priority queue data structure](https://en.wikipedia.org/wiki/Priority_queue) from `values`.

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
