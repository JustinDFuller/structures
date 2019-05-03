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
