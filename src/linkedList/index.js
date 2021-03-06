/**
 * @module linkedList
 */

/**
 * @private
 * @param {any} value The node value
 * @param {Object} next The node that follows this node in the list.
 * @returns {Object} The created node.
 */
function createNode (value = undefined, next = null) {
  return {
    value,
    next
  }
}

/**
 * @private
 * @param {Object} The node to evaluate
 * @returns {Boolean} If the node is empty.
 */
function isEmpty (node) {
  return node.value === undefined && node.next === null
}

/**
 * A function that returns a singly linked list.
 * @example
 * import linkedList from 'structures/linkedList'
 *
 * const myLinkedList = linkedList()
 * @returns {Object} The linkedList object.
 */
module.exports = function linkedList (root = createNode()) {
  const list = {
    /**
     * Append a value to the end of the linked list.
     * This will give a value to the head of the list if it is empty.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1)
     * // linkedList contains: { value: 1, next: null }
     *
     * @param {any} value The value that will be given to the new node.
     * @returns {Object} The linkedList object.
     */
    push (value) {
      if (isEmpty(root) === true) {
        root.value = value
      } else {
        list.last().next = createNode(value)
      }

      return list
    },
    /**
     * Add a value to the beginning of the list.
     * This will give a value to the head of the list if it is empty.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1).prepend(2)
     * // linkedList contains { value: 2, next: { value: 2, next: null } }
     * @param {any} value The value that will be given to the new node.
     * @returns {Object} the linkedList object.
     */
    prepend (value) {
      if (isEmpty(root) === true) {
        root.value = value
      } else {
        root = createNode(value, root)
      }

      return list
    },
    /**
     * Remove nodes from the list where predicate is falsy.
     * If the last node is falsy it will set its value to undefined.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1).push(2).push(3).filter(i => i % 2 === 0)
     * // linkedList contains { value: 2, next: null }
     * @param {function ()} predicate Should return a falsy value for any node that should be removed.
     * @returns {Object} the linkedList object.
     */
    filter (predicate) {
      let node = root

      while (node !== null) {
        if (predicate(node.value) === false) {
          if (node.next !== null) {
            node.value = node.next.value
            node.next = node.next.next
          } else {
            node.value = undefined
          }
        }

        node = node.next
      }

      return list
    },
    /**
     * Creates a new linked list where values are replaced by the result of iteratee.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1).push(2).push(3)
     * const doubledList = myLinkedList.map(i => i * 2)
     * // list contains { value: 2, next: { value: 4, next{ value: 6, next: null } } }
     * @param {function ()} iteratee The function that will return a new value.
     * @returns {Object} A new linkedList object.
     */
    map (iteratee) {
      const mapped = linkedList()
      let mappedTail = mapped.first()
      let node = root

      mappedTail.value = iteratee(node.value)
      node = node.next

      while (node !== null) {
        mappedTail.next = createNode(iteratee(node.value))
        mappedTail = mappedTail.next
        node = node.next
      }

      return mapped
    },
    /**
     * Executes an in-place reversal of the nodes in the linked list..
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1).push(2).push(3)
     * const reversed = myLinkedList.reverse()
     * // myLinkedList contains { value: 3, next: { value: 2, next: { value: 1, next: null  } } }
     * @returns {Object} the linkedList object.
     */
    reverse () {
      const reversed = linkedList()

      let node = list.first()

      while (node !== null) {
        reversed.prepend(node.value)
        node = node.next
      }

      root = reversed.first()

      return list
    },
    /**
     * Inserts a new node, with the given value, after the node that predicate returns truthy for.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1).push(3)
     * myLinkedList.insert(i => i === 1, 2)
     * // myLinkedList contains { value: 1, next: { value: 2, next: { value: 3, next: null } } }
     * @param {function ()} predicate Determines where to insert the given value.
     * @param {any} value The value to insert.
     * @returns {Object} the linkedList object.
     */
    insert (predicate, value) {
      let node = root

      while (node !== null) {
        if (predicate(node.value) === true) {
          node.next = createNode(value, node.next)
          break
        }

        node = node.next
      }

      return list
    },
    /**
     * Creates a linked list from an array.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().from([1,2,3])
     * // myLinkedList contains { value: 1, next: { value: 2, next: { value: 3, next: null } } }
     * @param {any[]} array An array of values to add to the linked list.
     * @returns {Object} the linkedList object.
     */
    from (array) {
      for (let i = array.length - 1; i >= 0; i--) {
        list.prepend(array[i])
      }

      return list
    },
    sort (iteratee) {
      function combineAndSort (head, tail, end) {
        const sorted = linkedList()

        let sortedNode = sorted.first()
        let headNode = head
        let tailNode = tail

        while (headNode !== tail && tailNode !== end) {
          let toAppend

          if (iteratee(headNode, tailNode)) {
            toAppend = headNode
            headNode = headNode.next
          } else {
            toAppend = tailNode
            tailNode = tailNode.next
          }

          if (isEmpty(sortedNode) === true) {
            sortedNode.value = toAppend.value
          } else {
            sortedNode.next = createNode(toAppend.value)
          }
        }

        while (headNode !== tail) {
          sortedNode.next = createNode(headNode.value)
          headNode = headNode.next
        }

        while (tailNode !== end) {
          sortedNode.next = createNode(tailNode.value)
          tailNode = tailNode.next
        }

        return sorted.first()
      }

      function mergeSort (start, end) {
        if (start.next === end) {
          return start
        }

        let slow = start
        let fast = start

        while (fast !== end) {
          slow = slow.next
          fast = fast && fast.next && fast.next.next
        }

        const head = mergeSort(start, slow)
        const tail = mergeSort(slow, end)
        return combineAndSort(head, tail, end)
      }

      // root = mergeSort(root, null)

      // console.log([...list].map(i => i.value))

      return list
    },
    /**
     * Remove the first node and return it.
     * @memberof module:linkedList
     * @example
     * const myLinkedList = linkedList().push(1).push(2)
     * const head = myLinkedList.shift().value // 1
     * // myLinkedList contains { value: 2, next: null  }
     * @returns {Object} the first node in the list.
     */
    shift () {
      const node = root
      root = node.next === null ? createNode() : node.next
      return node
    },
    find (predicate) {
      let node = root

      while (node !== null) {
        if (predicate(node.value) === true) {
          break
        }

        node = node.next
      }

      return node
    },
    last () {
      let node = root

      while (node.next !== null) {
        node = node.next
      }

      return node
    },
    first () {
      return root
    },
    [Symbol.iterator] () {
      let nextNode = root

      return {
        next () {
          const value = nextNode

          if (nextNode !== null) {
            nextNode = nextNode.next
          }

          return {
            done: value === null,
            value
          }
        }
      }
    }
  }

  return list
}
