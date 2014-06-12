function id(x) { return x; };

var GridBase = function() {
  this.callbacks = {
    newCells: [],
    cells: [],
    newRows: [],
    rows: []
  };

  this.onNewCells = function(cb) {
    this.callbacks.newCells.push(cb);
    return this;
  };
  this.newCells = function(cells) {
    this.callbacks.newCells.forEach(function(cb) { cb(cells); });
  };

  this.onCells = function(cb) {
    this.callbacks.cells.push(cb);
    return this;
  };
  this.cells = function(cells) {
    this.callbacks.cells.forEach(function(cb) { cb(cells); });
  };

  this.onNewRows = function(cb) {
    this.callbacks.newRows.push(cb);
    return this;
  };
  this.newRows = function(cells) {
    this.callbacks.newRows.forEach(function(cb) { cb(cells); });
  };

  this.onRows = function(cb) {
    this.callbacks.rows.push(cb);
    return this;
  };
  this.rows = function(cells) {
    this.callbacks.rows.forEach(function(cb) { cb(cells); });
  };

  this._into = undefined;
  this.into = function(el) {
    if(undefined === el) {
      return this._into;
    } else {
      this._into = el;
      return this;
    }
  };
};

var AsTable = function(config) {
  config = config || {};
  GridBase.call(this);

  this.makeRow = config.makeRow || function(enter) {
    return enter.append('tr');
  };

  this.makeColumn = config.makeColumn || function(enter) {
    return enter.append('td');
  };

  this.onNewCells(this.defaultOnNewCells = function(cells) {
    cells.append('span').text(id);
  });
};

var AsLists = function(config) {
  config = config || {};
  GridBase.call(this);

  this.makeRow = config.makeRow || function(enter) {
    return enter.append('li').append('ul');
  };

  this.makeColumn = config.makeColumn || function(enter) {
    return enter.append('li');
  };
};

function error(message) {
  throw message;
}

function render2D(data, config) {
  var child = '.grid-d3-child';
  var grandchild = '.grid-d3-grandchild';

  var rows = config.into().selectAll(child);
  var rowData = rows.data(data);
  rowData.exit().remove();

  var newRows = config.makeRow(rowData.enter())
             || error('makeRow did not return a selection');
  newRows.classed(child.substr(1), true);

  config.newRows(newRows);
  config.rows(rowData);

  var cells = config.into().selectAll(child).selectAll(grandchild);
  var cellData = cells.data(id);
  cellData.exit().remove();

  var newCells = config.makeColumn(cellData.enter())
              || error('makeColumn did not return a selection');
  newCells.classed(grandchild.substr(1), true);

  config.newCells(newCells);
  config.cells(cellData);

  return [rowData, cellData];
}

module.exports = {
  AsTable: AsTable,
  AsLists: AsLists,
  GridBase: GridBase,
  render2D: render2D,
  id: id,
};
