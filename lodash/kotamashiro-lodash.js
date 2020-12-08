
//例如false, null,0, "", undefined, 和 NaN 都是被认为是“假值”。
//创建一个新数组，包含原数组中所有的非假值元素。
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

  //将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
  function chunk(ary, size) {
    var result = []
    for (var i = 0, j = 0; i < ary.length; i += size, j++) {
      result[j] = ary.slice(i, i + size)
    }
    return result
  }

  //创建一个具有唯一array值的数组，每个值不包含在其他给定的数组中。
  function difference(ary, ...vals) {
    const result = new Set()
    for (let val of vals) {
      for (let res of val) result.add(res)//把需要对比的数组展开到新数组
    }
    return ary.filter(res => !result.has(res))
  }

  //创建一个新数组，将array与任何数组 或 值连接在一起
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


  //将 array 中的所有元素转换为由 separator 分隔的字符串。
  function join(arr, separator) {
    var res = ""
    for (var i = 0; i < arr.length - 1; i++) {
      res += arr[i] + '' + separator
    } res += arr[arr.length - 1]
    return res
  }

  //获取array中的最后一个元素
  function last(arr) {
    return arr[arr.length - 1]
  }

  //这个方法类似_.indexOf ，区别是它是从右到左遍历array的元素。
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
  //创建一个切片数组，去除array前面的n个元素。
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
  //创建一个切片数组，去除array尾部的n个元素
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
  //使用 value 值来填充（替换） array，从start位置开始, 到end位置结束（但不包含end位置）。
  function fill(arr, val, start, end) {


  }










  return { compact, chunk, difference, concat, join, last, lastIndexOf, drop, dropRight, fill, }
}()