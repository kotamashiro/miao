
var kotamashiro = function () {

  function difference(ary, ...vals) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      if (!(vals.includes(ary[i]))) {
        result.push(ary[i])
      }
    }
    return result
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

  function dropWhile(ary, pre) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (typeof pre == 'string') {
        if (pre in ary[i]) {
          res.push(ary[i])
        }
      }
      if (typeof pre == 'function') {
        if (!pre(ary[i])) {
          res.push(ary[i])
        }
      }
      if (typeof pre == 'object') {
        if (pre[key] !== ary[i][key]) {
          res.push(ary[i])
        }
      }
      if (Array.isArray(pre)) {
        if (ary[i][pre[0]] !== pre[1]) {
          res.push(ary[i])
        }
      }
    } return res
  }

  function dropRightWhile(ary, pre) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (typeof pre == 'string') {
        if (pre in ary[i]) {
          res.push(ary[i])
        }
      }
      if (typeof pre == 'function') {
        if (!pre(ary[i])) {
          res.push(ary[i])
        }
      }
      if (typeof pre == 'object') {
        for (key in pre) {
          if (pre[key] !== ary[i][key]) {
            res.push(ary[i])
          }
        }
      }
      if (Array.isArray(pre)) {
        if (ary[i][pre[0]] !== pre[1]) {
          res.push(ary[i])
        }
      }
    } return res
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

  function indexOf(ary, val, from = 0) {
    for (var i = from; i < ary.length; i++) {
      if (ary[i] == val)
        return i
    }
  }

  function initial(ary) {
    return ary.slice(0, ary.length - 1)
  }
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

  function findIndex(array, f, fromIndex) {
    if (typeof (f) == 'function') {
      for (var i = fromIndex; i < array.length; i++) {
        if (f(array[i])) return i
      }
      return -1

    } else if (Array.isArray(f)) {
      let key = f[0]
      let val = f[1]
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i][key] == val) return i
      }
      return -1
    } else if (typeof (f) == 'object') {
      for (var i = fromIndex; i < array.length; i++) {
        for (let j in array[i]) {
          if (f[j] && f[j] == array[i][j])
            return i
        }
      } return -1

    } else if (typeof (f) == 'string') {
      let key = f[0]
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i][key])
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
    if (array.length == 0) {
      return undefined
    }
    var max = array[0]
    for (var i = 0; i < array.length - 1; i++) {
      max = Math.max(max, array[i])
    }
    return max
  }

  function maxBy(array, iteratee) {
    var max = -Infinity
    var sum
    if (typeof iteratee == 'function') {
      for (let i of array) {
        if (max < iteratee[i])
          max = iteratee[i]
        sum = i
      }
    } else {
      for (let i of array) {
        if (max < iteratee[i])
          max = iteratee[i]
        sum = i
      }
    }
    return sum
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

  function groupBy(arr, iteratee) {
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
    if (typeof iteratee == 'function') {
      for (var val of arr) {//val is key
        sum += iteratee(val)
      }
    } else {
      for (var val of arr) {
        sum += (val[iteratee])//val is obj
      }

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

  function every(c, boolean) {
    if (boolean != Boolean) {
      if (findIndex(c, boolean) != -1) {
        return true
      }
      return false
    }
    for (let e of c) {
      if (typeof e != 'boolean') {
        return false
      } return true
    }
  }


  function property(path) {
    var names = path.split('.')
    return function (obj) {
      for (var name of names) {
        if (name in obj) {
          obj = obj[name]
        } else {
          return
        }
      } return obj
    }
  }


  function ary(f, n = f.length) {
    return function (...args) {
      return
    }
  }




  function flip(func) {
    return function (...args) {
      return func(...args.reverse())

    }
  }

  function negate(pre) {
    return function (...args) {
      return !pre(...args)
    }
  }



  function intersectionBy(arr, iteratee) {//求交集

  }

  function intersection(...args) {
    var result = []
    for (var i = 0; i < args[0].length; i++) {
      for (var j = 1; j < args.length; j++) {
        if (!args[j].includes(args[0][i])) {//如果第j个数组不含有交集直接开始验证下一个数
          break
        }
      } if (j == args.length) {//此时所有数组都包含arg[0][i]
        result.push(args[0][i])
      }
    }
    return result
  }


  function stringify(val) {
    if (Array.isArray(val)) {
      return '[' + val.map(stringify) + ']'
    }
    if (val && typeof val == 'object') {
      var result = '({'
      for (var k in val) {
        var v = val[key]
        result += '"' + k + '":' + stringify(v) + ','
      }
      result = result.slice(0, -1)
      result += '})'
      return result
    }
    if (val === null) {
      return "null"
    }
    if (val === true) {
      return "true"
    }
    if (val === false) {
      return "false"
    }
    if (typeof val === 'string') {
      return '"' + val + '"'
    }
    if (typeof val === 'number') {
      return '' + val
    }
  }


  return {
    initial,
    negate,
    flip,
    compact,
    chunk,
    difference,

    concat,
    join,
    last,
    lastIndexOf,
    drop,
    dropRight,
    dropWhile,
    dropRightWhile,
    indexOf,
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
    max,
    maxBy,
    property,
    intersection,
  }
}()