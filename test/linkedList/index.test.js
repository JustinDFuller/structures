const test = require('ava')

const { linkedList } = require('../../src')

test('linkedList is a function', function (t) {
  t.is(typeof linkedList, 'function')
})

test('linkedList returns an object', function (t) {
  t.is(typeof linkedList(), 'object')
})

test('linkedList::push is a function', function (t) {
  t.is(typeof linkedList().push, 'function')
})

test('linkedList::last is a function', function (t) {
  t.is(typeof linkedList().last, 'function')
})

test('linkedList::push appends a value to the last element in the list', function (t) {
  t.is(
    linkedList()
      .push(1)
      .push(2)
      .last().value,
    2
  )
})

test('linkedList::last returns the last value in the list', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .last(),
    { next: null, value: 2 }
  )
})

test('linkedList::first returns the first element in the list', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .first(),
    { next: { next: null, value: 2 }, value: 1 }
  )
})

test('linkedList::prepend prepends a value to the first element in the list', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .prepend(2)
      .first(),
    { value: 2, next: { value: 1, next: null } }
  )
})

test('linkedList::filter removes any values that predicate returns falsy for', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .push(3)
      .push(4)
      .filter(i => i % 2 === 0)
      .first(),
    {
      value: 2,
      next: {
        value: 4,
        next: null
      }
    }
  )
})

test('linkedList::find returns the first node where predicate returns truthy', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .push(2)
      .find(i => i === 2),
    {
      value: 2,
      next: {
        value: 2,
        next: null
      }
    }
  )
})

test('linkedList::map replaces all values with result of iteratee', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .push(3)
      .map(i => i * 2)
      .first(),
    {
      value: 2,
      next: {
        value: 4,
        next: {
          value: 6,
          next: null
        }
      }
    }
  )
})

test('linkedList::reverse reverses the order of the list', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .push(3)
      .reverse()
      .first(),
    {
      value: 3,
      next: {
        value: 2,
        next: {
          value: 1,
          next: null
        }
      }
    }
  )
})

test('linkedList::insert adds a value when predicate is true', function (t) {
  t.deepEqual(
    linkedList()
      .push(1)
      .push(2)
      .push(4)
      .insert(i => i > 1, 3)
      .first(),
    {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    }
  )
})

test('linkedList::from creates a linked list from an array', function (t) {
  t.deepEqual(
    linkedList()
      .from([1, 2, 3, 4])
      .first(),
    {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: null
          }
        }
      }
    }
  )
})

test('linkedList::shift removes the first node from the list', function (t) {
  const list = linkedList()
    .push(1)
    .push(2)
  t.deepEqual(list.shift(), {
    value: 1,
    next: {
      value: 2,
      next: null
    }
  })
  t.deepEqual(list.first(), list.shift())
  t.deepEqual(list.first(), {
    value: undefined,
    next: null
  })
})

test('linkedList::sort sorts based on the iteratee function', function (t) {
  t.deepEqual(
    linkedList()
      .push(5)
      .push(2)
      .push(6)
      .push(1)
      .sort((a, b) => a < b)
      .first(),
    {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 5,
          next: {
            value: 6,
            next: null
          }
        }
      }
    }
  )
})

test('linkedList is an iterator', function (t) {
  const list = linkedList()
    .push(1)
    .push(2)
    .push(3)

  const results = []

  for (let node of list) {
    results.push(node.value)
  }

  t.deepEqual(results, [1, 2, 3])
})

test('linkedList can be spread', function (t) {
  const list = linkedList()
    .push(1)
    .push(2)
    .push(3)

  t.deepEqual([...list].map(i => i.value), [1, 2, 3])
})
