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
    for (var i = 0; i < ary.length; i += size) {
      for (var j = 0; j < size; j++) {
        result[j] = ary.slice(i, i + size)
      }
    }
    return result
  }
  return {
    compact, chunk,
  }
}()