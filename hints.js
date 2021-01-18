
var allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function findHint () {
  console.log("Finding by row");
  for(var row = 1; row <= 9; row++) {
    var hint = calculateOnlySpotInRowNumberCanBe(row);
    console.log(`hint is ${hint}`);
    if(hint) {
      return hint;
    }
  }
  console.log("Finding by column");
  for(var col = 1; col <= 9; col++) {
    var hint = calculateOnlySpotInColNumberCanBe(col);
    console.log(`hint is ${hint}`);
    if(hint) {
      return hint;
    }
  }
  console.log("Finding by square");
  for(var row = 1; row <= 9; row++) {
    for(var col = 1; col <= 9; col++) {
      var hint = calculateOnlySpotInSquareNumberCanBe(row, col);
      console.log(`hint is ${hint}`);
      if(hint) {
        return hint;
      }
    }
  }
}

function calculateOnlySpotInRowNumberCanBe(row) {
  var possibles = {}
  var empties = getEmptyIndexes(getRowIndices(row));
  var needed = getDifference(getRowValues(row), allNumbers);
  empties.forEach(empty => {
    e_row = empty[0];
    e_col = empty[1];
    needed.forEach(need => {
      if(!getColValues(e_col).includes(need) && !getSquareValues(e_row, e_col).includes(need)) {
        possibles = addPossible(possibles, need, empty);
      }
    });
  });

  return findHintInPossibles(needed, possibles);
}

function calculateOnlySpotInColNumberCanBe(col) {
  var possibles = {}
  var empties = getEmptyIndexes(getColumnIndices(col));
  var needed = getDifference(getColValues(col), allNumbers);

  empties.forEach(empty => {
    e_row = empty[0];
    e_col = empty[1];
    needed.forEach(need => {
      if(!getRowValues(e_row).includes(need) && !getSquareValues(e_row, e_col).includes(need)) {
        possibles = addPossible(possibles, need, empty);
      }
    });
  });

  // so anything with only 1 value is something we should hint
  return findHintInPossibles(needed, possibles);
}

function calculateOnlySpotInSquareNumberCanBe(row, col) {
  var possibles = {}
  var empties = getEmptyIndexes(getSquareIndices(row, col));
  var needed = getDifference(getSquareValues(row, col), allNumbers);

  empties.forEach(empty => {
    e_row = empty[0];
    e_col = empty[1];
    needed.forEach(need => {
      if(!getRowValues(e_row).includes(need) && !getColValues(e_col).includes(need)) {
        possibles = addPossible(possibles, need, empty);
      }
    });
  });

  // so anything with only 1 value is something we should hint
  return findHintInPossibles(needed, possibles);
}

function findHintInPossibles(needed, possibles) {
  var retval = null;
  // so anything with only 1 value is something we should hint
  needed.forEach(need => {
    if(possibles[need] && possibles[need].length === 1) {
      var hint = makeHint(possibles[need][0], need);
      retval = hint;
      return;
    }
  });
  return retval;
}

function addPossible(possibles, need, empty) {
  if(need in possibles) {
    possibles[need].push(empty);
  } else {
    possibles[need] = [empty];
  }
  return possibles;
}

function makeHint(index, value) {
  return {
    row: index[0],
    col: index[1],
    hint: value
  }
}

function getDifference(a, b) {
  return b.filter(i => !a.includes(i));
}

function getAllValues(row, col) {
  return new Set(getRowValues(row).concat(getColValues(col)).concat(getSquareValues(row, col)));
}

// get values
function getRowValues(row) {
  return getValsForArray(getRowIndices(row));
}

function getColValues(col) {
  return getValsForArray(getColumnIndices(col));
}

function getSquareValues(row, col) {
  return getValsForArray(getSquareIndices(row, col));
};

function getValsForArray(indices) {
  var retVal = [];
  indices.forEach(index => {
    var value = getValue(index[0], index[1]);
    if(value) {
      retVal.push(value);
    }
  });
  return retVal;
}

function getEmptyIndexes(indices) {
  return indices.filter(index => getValue(index[0], index[1]) === null);
}

// groupings
function getRowIndices(row) {
  var indices = [];
  for(var i = 1; i <= 9; i++) {
    indices.push(makeIndex(row, i));
  }
  return indices;
}

function getColumnIndices(col) {
  var indices = [];
  for(var i = 1; i <= 9; i++) {
    indices.push(makeIndex(i, col));
  }
  return indices;
}

function getSquareIndices(row, col) {
  var rows = parseInt((row - 1) / 3) * 3;
  var cols = parseInt((col - 1) / 3) * 3;
  var indices = [
    makeIndex(rows + 1, cols + 1), makeIndex(rows + 1, cols + 2), makeIndex(rows + 1, cols + 3),
    makeIndex(rows + 2, cols + 1), makeIndex(rows + 2, cols + 2), makeIndex(rows + 2, cols + 3),
    makeIndex(rows + 3, cols + 1), makeIndex(rows + 3, cols + 2), makeIndex(rows + 3, cols + 3)
  ]
  return indices;
}

function makeIndex(row, col) {
  return [row, col];
}
