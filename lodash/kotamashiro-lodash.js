
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

  function concat(arr, vals) {
    var result = arr.slice()
    for (var i = 0; i < vals.length; i++) {
      if (arr.isArray(vals[i])) {
        for (var j = 0; j < vals[i].length; j++) {
          result.push(vals[i][j])
        }
      } else {
        result.push(vals[i])
      }
    } return result
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

  function findIndex(array, predicate, fromIndex) {
    if (typeof (predicate) == 'function') {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i] == predicate) return i
      }
      return -1

    } else if (Array.isArray(predicate)) {
      for (var i = fromIndex; i < array.length; i++) {
        for (let j in array[i]) {
          if (predicate[0] == j && predicate[1] == array[i][j])
            return i
        }
      } return -1
    } else if (typeof (predicate) == 'object') {
      for (var i = fromIndex; i < array.length; i++) {
        for (let j in array[i]) {
          if (predicate[j] && predicate[j] == array[i][j])
            return i
        }
      } return -1
    } else if (typeof (predicate) == 'string') {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i][predicate])
          return i
      } return -1
    }
  }

  function head(arr) {
    if (arr == null) {
      return undefined
    }
    return arr[0]
  }

  function max(array) {
    if (array == null) {
      return undefined
    }
    var max = []
    for (var i = 0; i < array.length - 1; i++) {
      if (array[i] < array[i + 1]) {
        max = array[i + 1]
      } max = array[i]
    }
    return max
  }
  function identity(val) {
    return val
  }


  function isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  }

  function flatten(array) {
    return flattenDepth(array, 1)

  }
  function flattenDeep(array) {
    return flattenDepth(array, Infinity)
  }

  function flattenDepth(arr, depth = 1) {
    if (depth == 0) {
      return arr.slice()
    }
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        result.push(...flattenDepth(arr[i], depth - 1))
      } else {
        result.push(arr[i])
      }
    }
    return result
  }
  function groupBy(arr, predicate) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      var key = predicate(arr[i], i, arr)
      if (!arr.isArray(result[key])) {
        result[key] = []
      } result[key].push(arr[i])

    } return result
  }
  function sumBy(arr, iteratee) {
    var sum = 0
    for (var i = 0; i < arr.length; i++) {
      sum += iteratee(arr[i])
    }
    return sum
  }
  function sum(arr) {
    var sum = 0
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i]
    }
    return sum
  }

  function mapValues(obj, map) {
    var result = {}
    for (let key in obj) {
      var val = obj[key]
      result[key] = map(val, key, obj)
    }
    return result
  }

  function mapKeys(obj, map) {
    var result = {}
    for (let key in obj) {
      var val = obj[key]
      result[map(val, key, obj)] = val
    }
    return result
  }
  function every(arr, f) {

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
    findIndex,
    head,
    isArray,
    flattenDepth,
    groupBy,
    sumBy,
    sum,
    mapValues,
    mapKeys,
    identity,
    every,
    flatten,
    flattenDeep,
    max

  }
}()