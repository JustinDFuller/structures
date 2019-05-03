module.exports = function linkedList () {
  let root = {
    next: null,
    value: undefined
  }

  const methods = {
    push (value) {
      if (!root.value && !root.next) {
        root.value = value
      } else {
        methods.last().next = {
          value,
          next: null
        }
      }

      return methods
    },
    prepend (value) {
      root = {
        value,
        next: root
      }

      return methods
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
            node.next = null
          }
        }

        node = node.next
      }

      return methods
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
    }
  }

  return methods
}
