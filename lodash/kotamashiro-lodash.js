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
  function difference(ary, val) {
    var result = []
    for (var i = 0; i < ary.length; i++) {
      for (var j = 0; i < val.length; j++) {
        if (ary[i] == val[j]) {
          ary.shift(ary[i])
          result = ary
        }
      }
    }
    return result
  }

  function concat(ary, val) {
    var result = []
    result = ary
    for (var i = 0; i < val.length; i++) {
      result.push(ary[i])
    }
    return result
  }
















  return {
    compact, chunk, difference, concat,
  }
}()