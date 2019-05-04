function swapNodes (node, next) {
  const previous = node
  const current = next || node.next
  const remaining = (current && current.next) || null
  current.next = previous

  if (!remaining) {
    return current
  }

  return swapNodes(current, remaining)
}

module.exports = function linkedList () {
  let root = {
    next: null,
    value: undefined
  }

  const list = {
    push (value) {
      if (!root.value && !root.next) {
        root.value = value
      } else {
        list.last().next = {
          value,
          next: null
        }
      }

      return list
    },
    prepend (value) {
      root = {
        value,
        next: root
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
      root = swapNodes({ value: root.value, next: null }, root.next)

      return list
    },
    insert (predicate, value) {
      let node = root

      while (node) {
        if (predicate(node.value)) {
          node.next = {
            value,
            next: node.next
          }
          break
        }

        node = node.next
      }

      return list
    },
    from (array) {
      for (let i = 0; i < array.length; i++) {
        list.push(array[i])
      }

      return list
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

  return list
}
