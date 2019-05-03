const test = require('ava')

const structures = require('../src')

test('structures is an object', function (t) {
  t.is(typeof structures, 'object')
})

test('structures::linkedList is a function', function (t) {
  t.is(typeof structures.linkedList, 'function')
})
