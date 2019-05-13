const chalk = require('chalk')
const Benchmark = require('benchmark')

const { linkedList } = require('../')

const suite = new Benchmark.Suite()

let linkedListMap = linkedList()
  .push(1)
  .push(2)
  .push(3)
let arrayMap = [1, 2, 3]

console.log('| Data Type | Action | Result |')
console.log('|-----------|--------|--------|')

suite
  .add('LinkedList:Create', function () {
    linkedList()
  })
  .add('Array:Create', function () {
    new Array()
  })
  .add('Array:CreateLiteral', function () {
    ;[]
  })

  .add('LinkedList:Unshift size 100 (small array)', function () {
    const unshift = linkedList()

    for (let i = 0; i < 100; i++) {
      unshift.prepend(1)
    }
  })
  .add('Array:Unshift size 100 (small array)', function () {
    const unshift = new Array()

    for (let i = 0; i < 1000; i++) {
      unshift.unshift(1)
    }
  })

  .add('LinkedList:Unshift size 10000 (medium array)', function () {
    const unshift = linkedList()

    for (let i = 0; i < 10000; i++) {
      unshift.prepend(1)
    }
  })
  .add('Array:Unshift size 10000 (medium array)', function () {
    const unshift = new Array()

    for (let i = 0; i < 10000; i++) {
      unshift.unshift(1)
    }
  })

  .add('LinkedList:Map', function () {
    linkedListMap.map(i => i / 2)
  })
  .add('Array:Map', function () {
    arrayMap.map(i => i / 2)
  })

  .add('LinkedList:Reverse', function () {
    linkedListMap.reverse()
  })
  .add('Array:Reverse', function () {
    arrayMap.reverse()
  })

  .add('LinkedList:shift', function () {
    linkedList({
      value: 1,
      next: { value: 2, next: { value: 3, next: null } }
    }).shift()
  })
  .add('Array:shift', function () {
    let arr = [1, 2, 3]
    arr.shift()
  })

  .on('cycle', function (event) {
    const [type, action, result, variance] = event.target
      .toString()
      .split(/[:x±]/g)
      .map(s => s.trim())
    console.log(`| ${type} | ${action} | ${result} |`)
  })
  .run({ async: true })
