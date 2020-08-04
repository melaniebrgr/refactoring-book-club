# Replace primitive with object

`Replace primitive with object` is a good candidate for a closer look since it's "one of the most valuable refactorings in the toolkit". The general idea on this refactoring is ~~to take perfectly good JS and make it object oriented~~ attach methods to the data it is related to.

> As soon as I realize I want to do something other than simple printing, I like to create a new class for that bit of data ... once I have a class I have a place to put behaviour specific to its needs.

Fowler is operating on the assumption that OOP is the answer to making code readable/understandable and modifiable. The example provided:

#### Before
```
class Order {
  constructor(data) {
    this.priority = data.priority;
    // more initialization
  }
}

// elsewhere
const highPriorityCount = orders.filter(
  o => o.priority === "high" ||
  o => o.priority === "rush"
).length
```

#### After
```
class Priority {
  constructor(value) {
    if (value instanceof Priority) return value;
    if (Priority.legalValues().includes(value)) {
      this._value = value;
    } else {
      throw new Error(`<$value> is invalid for Priority`)
    }
  }

  toString() { 
    return this._value;
  }

  get _index() { 
    return Priority.legalValues().findIndex(s => s === this._value);
  }

  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }

  equals(other) {
    return this._index === other._index;
  }

  higherThan(other) {
    return this._index > other._index;
  }

  lowerThan(other) {
    return this._index < other._index;
  }
}

class Order {
  constructor(data) {
    this.priority = data.priority;
    // more initialization
  }
}

// elsewhere
const highPriorityCount = orders.filter(
  o => o.priority.higherThan(new Priority("normal"))
).length
```

I think what Fowler is getting at is removing the ad-hoc checks and magic strings in the callback function. Are there alternative ways to refactor this code that accomplishes this? Here's another approach:

```
const PRIORITIES = Object.freeze({
  LOW: 1
  NORMAL: 2
  HIGH: 3
  RUSH: 4
});

const isGreaterThan = (p1, p2) => p1 > p2;

const filterOrdersByPrioritiesHigherThan = (minimumPriority) => 
  (order) => isGreaterThan(order.priority, minimumPriority);

const highPriorityCount = orders.filter(
  filterOrdersByPrioritiesHigherThan(PRIORITIES.NORMAL)
).length;
```

The advantages of this approach are increased flexibility, e.g. if I need to adjust how the orders are prioritized. In my opinion, the flexibility of creating different methods as needed, and light prototypes outweigh the "risk" of duplicating methods. (Which is not the biggest issue here anyway.)