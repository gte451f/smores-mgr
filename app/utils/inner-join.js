export default function innerJoin(a, b, select) {
  var m = a.length, n = b.length, c = [];

  for (var i = 0; i < m; i++) {
    var x = a[i];

    for (var j = 0; j < n; j++) { // cartesian product - all combinations
      var y = select(x, b[j]);  // filter out the rows and columns you want
      if (y) {
        c.push(y);         // if a row is returned add it to the table
      }
    }
  }

  return c;
}
