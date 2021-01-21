
var kotamashiro = function () {

  function difference(ary, ...vals) {
    var result = []
    var value = []
    for (item of vals) {
      value.push(...item)
    }
    for (var i = 0; i < ary.length; i++) {
      if (!(value.includes(ary[i]))) {
        result.push(ary[i])
      }
    }
    return result
  }

  function concat(ary, ...values) {
    let res = ary
    for (let i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        res.push(...values[i])
      } else {
        res.push(values[i])
      }
    }
    return res
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

  function dropWhile(ary, predicate) {
    var type = Object.prototype.toString.call(predicate)
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (type === '[object Function]') {
        if (predicate(ary[i]) == false) {
          res.push(...ary.slice(i))
          break
        }
        continue
      }
      if (type === '[object String]') {
        if (predicate in ary[i]) {
          res.push(ary[i])
        }
      }
      if (type === '[object Object]') {
        for (var key in ary[i]) {
          if (predicate[key] !== ary[i][key]) {
            res.push(ary[i])
            break
          }
        }
      }
      if (type === '[object Array]') {
        if (ary[i][predicate[0]] !== predicate[1]) {
          res.push(ary[i])
        }
      }
    }
    return res
  }


  function dropRightWhile(ary, predicate) {
    var type = Object.prototype.toString.call(predicate)
    var res = []
    for (var i = 0; i < ary.length; i++) {
      if (type === '[object Function]') {
        if (!predicate(ary[i])) {
          res.push(ary[i])
        }
      }
      if (type === '[object String]') {
        if (predicate in ary[i]) {
          res.push(ary[i])
        }
      }
      if (type === '[object Object]') {
        for (var key in ary[i]) {
          if (predicate[key] !== ary[i][key]) {
            res.push(ary[i])
            break
          }
        }
      }
      if (type === '[object Array]') {
        if (ary[i][predicate[0]] !== predicate[1]) {
          res.push(ary[i])
        }
      }
    }
    return res
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

  function findIndex(array, predicate, fromIndex) {
    for (var i = fromIndex; i < array.length; i++) {
      if (typeof predicate == 'function') {
        if (predicate(array[i])) {
          return i
        }
      } else if (typeof predicate == 'string') {
        if (array[i][predicate] == true) {
          return i
        }
      } else if (Array.isArray(predicate)) {
        var flag = true
        for (var j = 0; j < predicate.length; j += 2) {
          if (array[i][predicate[j]] != predicate[j + 1]) {
            flag = false
            break
          }
        }
        if (flag == true) {
          return i
        }
      } else if (typeof predicate == 'object') {
        var flag = true
        for (key in predicate) {
          if (predicate[key] != array[i][key]) {
            flag = false
            break
          }
        }
        if (flag == true) {
          return i
        }
      }
    }
    return -1
  }


  function fromPairs(ary) {
    var obj = {}
    for (let i = 0; i < ary.length; i++)
      obj[ary[i][0]] = ary[i][1]
    return obj
  }

  function pull(ary, ...vals) {
    var res = []
    for (var i = 0; i < ary.length; i++) {
      for (var j = 0; j < vals.length; j++) {
        if (vals[j] !== ary[i]) {
          res.push(vals[i])
        }
      }
    } return res
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

  function reverse(arr) {
    var res = []
    for (var i = arr.length; i > 1; i--) {
      res.push(arr[i])
    }
    return res
  }

  function sortedIndex(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (value <= array[i]) {
        return i
      }
    }
  }
  function union(...array) {
    var map = {}
    var res = []
    var arrays = [].concat(...array)
    for (var key of arrays) {
      if (!map[key]) {
        map[key] = 1
        res.push(key)
      }
    }
    return res
  }
  function unionBy(...args) {
    let iteratee = args[args.length - 1]
    let result = []
    let map = {}
    if (typeof (iteratee) == 'function') {
      for (let i = 0; i < args.length - 1; i++) {
        for (let j = 0; j < args[i].length; j++) {
          if (!(iteratee(args[i][j]) in map)) {
            map[iteratee(args[i][j])] = 1
            result.push(args[i][j])
          }
        }
      }
    } else
      if (typeof (iteratee) == 'string') {
        for (let i = 0; i < args.length - 1; i++) {
          for (let j = 0; j < args[i].length; j++) {
            if (!(args[i][j][iteratee] in map)) {
              map[args[i][j][iteratee]] = 1
              result.push(args[i][j])
            }
          }
        }
      }
    return result

  }
  function uniq(array) {
    var map = {}
    var res = []
    for (var key of array) {
      if (!map[key]) {
        map[key] = 1
        res.push(key)
      }
    }
    return res

  }

  function uniqBy(array, iteratee) {
    var result = []
    var arr = []
    if (typeof iteratee == 'string') {
      for (var item of array) {
        if (!arr.includes(item[iteratee])) {
          arr.push(item[iteratee])
          result.push(item)
        }
      }
      return result
    }
    if (typeof iteratee == 'function') {
      for (var item of array) {
        if (!arr.includes(iteratee(item))) {
          arr.push(iteratee(item))
          result.push(item)
        }
      }
      return result
    }

  }

  return {
    uniq,
    uniqBy,
    union,
    unionBy,
    sortedIndex,
    initial,
    pull,
    negate,
    flip,
    compact,
    chunk,
    difference,
    fromPairs,
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
    reverse,
  }
}()