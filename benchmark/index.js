const chalk = require('chalk')
const Benchmark = require('benchmark')

const { linkedList } = require('../')

const suite = new Benchmark.Suite()

let linkedListMap = linkedList()
  .push(1)
  .push(2)
  .push(3)
let arrayMap = [1, 2, 3]

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

  .add('LinkedList:Unshift: x100 (small array)', function () {
    const unshift = linkedList()

    for (let i = 0; i < 100; i++) {
      unshift.prepend(1)
    }
  })
  .add('Array:Unshift: x100 (small array)', function () {
    const unshift = new Array()

    for (let i = 0; i < 1000; i++) {
      unshift.unshift(1)
    }
  })

  .add('LinkedList:Unshift: x10000 (medium array)', function () {
    const unshift = linkedList()

    for (let i = 0; i < 10000; i++) {
      unshift.prepend(1)
    }
  })
  .add('Array:Unshift: x10000 (medium array)', function () {
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

  .on('cycle', function (event) {
    console.log(event.target.toString())
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
