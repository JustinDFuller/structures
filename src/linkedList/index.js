function createNode (value = undefined, next = null) {
  return {
    value,
    next
  }
}

function isEmpty (node) {
  return node.value === undefined && node.next === null
}

module.exports = function linkedList () {
  let root = createNode()

  const list = {
    push (value) {
      if (isEmpty(root)) {
        root.value = value
      } else {
        list.last().next = createNode(value)
      }

      return list
    },
    prepend (value) {
      if (isEmpty(root)) {
        root.value = value
      } else {
        root = createNode(value, root)
      }

      return list
    },
    filter (predicate) {
      let node = root

      while (node) {
        if (!predicate(node.value)) {
          if (node.next) {
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
    map (iteratee) {
      let node = root

      while (node) {
        node.value = iteratee(node.value)
        node = node.next
      }

      return list
    },
    reverse () {
      const reversed = linkedList()

      let node = list.shift()

      while (node) {
        reversed.prepend(node.value)
        node = node.next ? list.shift() : null
      }

      root = reversed.first()

      return list
    },
    insert (predicate, value) {
      let node = root

      while (node) {
        if (predicate(node.value)) {
          node.next = createNode(value, node.next)
          break
        }

        node = node.next
      }

      return list
    },
    from (array) {
      for (let i = array.length - 1; i >= 0; i--) {
        list.prepend(array[i])
      }

      return list
    },
    sort (iteratee) {},
    shift () {
      const node = root
      root = node.next || createNode()
      return node
    },
    find (predicate) {
      let node = root

      while (node) {
        if (predicate(node.value)) {
          break
        }

        node = node.next
      }

      return node
    },
    last () {
      let node = root

      while (node.next) {
        node = node.next
      }

      return node
    },
    first () {
      return root
    },
    [Symbol.iterator] () {
      let node = root

      return {
        next () {
          const value = node
          node = node && node.next

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
