board = [
  ["_","_","6","_","8","_","_","_","_"],
  ["5","8","4","_","2","7","_","_","_"],
  ["2","1","_","_","_","_","_","_","8"],
  ["_","_","_","_","_","4","8","6","_"],
  ["3","2","_","_","6","_","_","7","1"],
  ["_","4","8","2","_","_","_","_","_"],
  ["8","_","_","_","_","_","_","4","6"],
  ["_","_","_","6","1","_","3","2","9"],
  ["_","_","_","_","4","_","1","_","_"]
]

board.forEach((row, row_num) => {
  row.forEach((item, col_num) => {
    var elem = getElement(row_num + 1, col_num + 1);

    if(item !== '_') {
      addText(elem, item);
    }
  });
});

document.getElementById("hint").addEventListener("click", function() {
  var hint = findHint();
  var elem = getElement(hint.row, hint.col);
  elem.classList.toggle('hint');
  addText(elem, hint.hint);
});

function addText(elem, text) {
  var p = document.createElement("p");
  var t = document.createTextNode(text);
  p.appendChild(t);

  elem.appendChild(p);
}

function getElement(row, col) {
  return document.querySelectorAll(`[data-row="${row}"][data-column="${col}"]`)[0];
}

function getValue(row, col) {
  var elem = getElement(row, col);
  var text = elem.getElementsByTagName('p')[0].innerHTML;
  return parseInt(text);
}