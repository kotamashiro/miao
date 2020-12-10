
var kotamashiro = function () {
  function compact(ary) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i])
      }
    }
    return result
  }

  function chunk(ary, size) {
    var result = []
    for (var i = 0, j = 0; i < ary.length; i += size, j++) {
      result[j] = ary.slice(i, i + size)
    }
    return result
  }

  function difference(ary, ...vals) {
    const result = new Set()
    for (let val of vals) {
      for (let res of val) result.add(res)
    }
    return ary.filter(res => !result.has(res))
  }

  function concat(ary, vals) {
    const result = ary.slice()

    for (var i = 0; i < vals.length; i++) {
      if (Array.isArray(vals[i])) {
        for (var j = 0; j < vals[i].length; j++) {
          result.push(vals[i][j])
        }
      } else result.push(vals[i])
    }
    return result
  }


  function join(arr, separator) {
    var res = ""
    for (var i = 0; i < arr.length - 1; i++) {
      res += arr[i] + '' + separator
    } res += arr[arr.length - 1]
    return res
  }

  function last(arr) {
    return arr[arr.length - 1]
  }

  function lastIndexOf(arr, val, number) {
    var num = arr.length
    if (number == undefined) {
      number = num - 1
    }
    for (i = number; i >= 0; i--) {
      if (arr[i] === val) {
        return i
      }
    } return -1
  }

  function drop(arr, n) {
    var arr2 = []
    if (n >= arr.length) {
      return []
    }
    if (n == undefined) {
      n = 1
    }
    if (n == 0) {
      return arr
    }
    for (var i = n; i < arr.length; i++) {
      arr2.push(arr[i])
    } return arr2

  }

  function dropRight(arr, n) {
    var arr2 = []
    if (n >= arr.length) {
      return []
    }
    if (n == undefined) {
      n = 1
    }
    if (n == 0) {
      return arr
    }
    for (var i = 0; i < arr.length - n; i++) {
      arr2.push(arr[i])
    } return arr2

  }

  function fill(arr, val, start, end) {
    if (start == undefined) {
      start = 0
      end = arr.length
    }
    for (var i = start; i < end; i++) {
      arr[i] = val
    }
    return arr
  }

  function fillIndex(array, predicate, fromIndex) {
    if (typeof (predicate) == 'function') {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i] == predicate) return i
      }
      return -1

    } else if (Array.isArray(predicate)) {
      for (var i = fromIndex; i < array.length; i++) {

      }
    } else if (typeof (predicate) == 'object') {

    } else if (typeof (predicate) == 'string') {

    }


  }









  return {
    compact,
    chunk,
    difference,
    concat,
    join,
    last,
    lastIndexOf,
    drop,
    dropRight,
    fill,
    fillIndex
  }
}()