export function createTable(tableData) {
	let table = document.createElement('table');
	table.setAttribute("id","table");

	let tableBody = document.createElement('tbody');

	tableData.forEach(function(rowData) {
	  let row = document.createElement('tr');

	  rowData.forEach(function(cellData) {
		let cell = document.createElement('td');

		cell.innerHTML = "<div style=\"display:flex; flex-direction:column; justify-content:center; align-items:center;\">" + cellData + "</div>";
		row.appendChild(cell);
	  });

	  tableBody.appendChild(row);
	});
	table.appendChild(tableBody);
	document.getElementById('game').appendChild(table);
}