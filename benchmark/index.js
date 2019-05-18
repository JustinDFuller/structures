const chalk = require('chalk')
const Benchmark = require('benchmark')

const { linkedList } = require('../')

const suite = new Benchmark.Suite()

let start = new Date()
let linkedListMap = linkedList()
  .push(1)
  .push(2)
  .push(3)
let arrayMap = [1, 2, 3]

console.log('| Data Type | Action | Result |')
console.log('|-----------|--------|--------|')

let linkedListActionCount = 0
let benchmarkList = linkedList()
let arrayActionCount = 0
let benchmarkArray = []

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
    benchmarkList.prepend(1)
    linkedListActionCount++

    if (linkedListActionCount === 100) {
      benchmarkList = linkedList()
      linkedListActionCount = 0
    }
  })
  .add('Array:Unshift size 100 (small array)', function () {
    benchmarkArray.unshift(1)
    arrayActionCount++

    if (arrayActionCount === 100) {
      benchmarkArray = []
      arrayActionCount = 0
    }
  })

  .add('LinkedList:Unshift size 100000 (medium array)', function () {
    benchmarkList.prepend(1)
    linkedListActionCount++

    if (linkedListActionCount === 100000) {
      benchmarkList = linkedList()
      linkedListActionCount = 0
    }
  })
  .add('Array:Unshift size 100000 (medium array)', function () {
    benchmarkArray.unshift(1)
    arrayActionCount++

    if (arrayActionCount === 100000) {
      benchmarkArray = []
      arrayActionCount = 0
    }
  })

  .add('LinkedList:Map', function linkedListMapFn () {
    linkedListMap.map(function innerMap (i) {
      return i
    })
  })
  .add('Array:Map', function linkedListMapFn () {
    arrayMap.map(function innerMap (i) {
      return i
    })
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

  .add('LinkedList:filter', function () {
    linkedList({
      value: 1,
      next: { value: 2, next: { value: 3, next: null } }
    }).filter(i => i % 2 === 0)
  })
  .add('Array:filter', function () {
    ;[1, 2, 3].filter(i => i % 2 === 0)
  })

  .add('LinkedList:push size 100 (small array)', function () {
    benchmarkList.push(1)
    linkedListActionCount++

    if (linkedListActionCount === 100) {
      benchmarkList = linkedList()
      linkedListActionCount = 0
    }
  })
  .add('Array:push size 100 (small array)', function () {
    benchmarkArray.push(1)
    arrayActionCount++

    if (arrayActionCount === 100) {
      benchmarkArray = []
      arrayActionCount = 0
    }
  })

  .add('LinkedList:push size 100000 (medium array)', function () {
    benchmarkList.push(1)
    linkedListActionCount++

    if (linkedListActionCount === 100000) {
      benchmarkList = linkedList()
      linkedListActionCount = 0
    }
  })
  .add('Array:push size 100000 (medium array)', function () {
    benchmarkArray.push(1)
    arrayActionCount++

    if (arrayActionCount === 100000) {
      benchmarkArray = []
      arrayActionCount = 0
    }
  })

  .on('cycle', function (event) {
    const [type, action, result, variance] = event.target
      .toString()
      .split(/[:x±]/g)
      .map(s => s.trim())
    console.log(`| ${type} | ${action} | ${result} |`)
    // resets
    benchmarkArray = []
    benchmarkList = linkedList()
    arrayActionCount = 0
    linkedListActionCount = 0
  })

  .on('complete', function () {
    console.log(`Took ${new Date() - start}`)
  })
  .on('error', function (e) {
    console.error(e.error)
  })
  .run()
