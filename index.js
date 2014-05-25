var d3 = require('d3');
var grid = require('./src/grid-d3.js');

window.onload = function() {
  var body = d3.select('body');
  var table = body.append('table');
  var list = body.append('ul');

  var asTable = new grid.AsTable()
    .into(table)
    .onNewCells(function(cells) {
      cells.insert('span', ':first-child').text('#');
    });

  var asList = new grid.AsLists()
    .into(list)
    .onNewCells(function(cells) {
      cells.text(grid.id).style('color', function(d) {
        return d > 3 ? 'red' : 'auto';
      });
    });
  
  var numbers = [
    [1, 2, 3, 4],
    [3, 4, 2, 7],
    [7, 3, 5, 9],
    [1, 2, 5, 6]
  ];
  var moreNumbers = numbers.concat([[7, 8, 9, 10]]);

  grid.render2D(numbers, asTable);
  grid.render2D(numbers, asList);
  numbers[0][0] = 50;
  grid.render2D(moreNumbers, asTable);
  grid.render2D(moreNumbers, asList);
};
