
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
  function difference(ary, val) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      for (var j = 0; j < val.length; j++) {
        if (ary[i] == val[j]) {
          ary.shift(ary[i])
          result = ary
        }
      }
    }
    return result
  }

  //创建一个新数组，将array与任何数组 或 值连接在一起
  function concat(ary, vals) {
    var result = [...ary]

    for (var i = 0; i < vals.length; i++) {
      if (Array.isArray(vals[i])) {
        for (var j = 0; j < vals[i].length; j++) {
          result.push(vals[i][j])
        }
      } else result.push(vals[i])
    }
    return result
  }
















  return {
    compact, chunk, difference, concat,
  }
}()