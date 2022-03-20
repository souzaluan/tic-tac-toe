export class Interface {
  constructor() {
    this.generateTitle();

    this.table = this.generateHash();

    return this.table;
  }

  generateTitle() {
    const root = document.querySelector("div.root");

    const title = document.createElement("h1");
    title.textContent = "Tic-Tae-Toe";
    root.appendChild(title);
  }

  generateHash() {
    const root = document.querySelector("div.root");

    const table = document.createElement("table");
    root.appendChild(table);

    for (let count = 0; count < 3; count++) {
      const tableRow = document.createElement("tr");
      table.appendChild(tableRow);

      for (let countSec = 0; countSec < 3; countSec++) {
        const tableData = document.createElement("td");
        tableData.setAttribute("data-position", `${count} ${countSec}`);
        tableRow.appendChild(tableData);
      }
    }
    return table;
  }
}
