export class Game {
  constructor(table) {
    this.table = table;

    this.options = ["X", "O"];
    this.lastOption = this.options[1];

    this.state = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this.listenEachSquare();
  }

  putElementHash() {
    Array.from(this.table.children).map((row, rowIndex) => {
      Array.from(row.children).map((data, dataIndex) => {
        if (this.state[rowIndex][dataIndex] == "X") {
          data.setAttribute("class", "x");
        } else {
          data.setAttribute("class", "o");
        }

        return (data.textContent = this.state[rowIndex][dataIndex]);
      });
    });
  }

  compareSimilarity(firstArray, secondArray) {
    const equalFound = [];

    for (let count in secondArray) {
      if (firstArray.indexOf(secondArray[count]) !== -1) {
        equalFound.push(firstArray.indexOf(secondArray[count]));
      }
    }

    return equalFound.length;
  }

  findAllIndexOf(array, element, indexArray) {
    let index = array.indexOf(element);

    while (index != -1) {
      indexArray.push(index);
      index = array.indexOf(element, index + 1);
    }

    return indexArray;
  }

  async analyzePlay(currentState) {
    const victoryPossibilities = await fetch("./possibilities.json")
      .then((data) => data.json())
      .then((result) => result.victory);

    const currentPositionsIndex = [];
    this.findAllIndexOf(JSON.stringify(currentState), 1, currentPositionsIndex);

    victoryPossibilities.map((possibility, index) => {
      const possibilityPositionsIndex = [];
      this.findAllIndexOf(
        JSON.stringify(possibility),
        1,
        possibilityPositionsIndex
      );

      const isVictory =
        this.compareSimilarity(
          currentPositionsIndex,
          possibilityPositionsIndex
        ) >= 3;

      if (isVictory) {
        alert("VICTORY!!");

        this.state = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];

        this.putElementHash();
      } else if (
        currentPositionsIndex.length == 5 &&
        index == victoryPossibilities.length - 1
      ) {
        alert("A TIE!");

        this.state = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];

        this.putElementHash();
      }
    });
  }

  listenEachSquare() {
    Array.from(this.table.children).map((row) => {
      Array.from(row.children).map((data) => {
        return data.addEventListener("click", ({ target }) => {
          const position = target.attributes["data-position"].value;
          const row = position.split(" ")[0];
          const data = position.split(" ")[1];

          const currentOption = this.lastOption == "X" ? "O" : "X";
          this.lastOption = currentOption;

          if (!this.state[row][data]) this.state[row][data] = currentOption;

          const formatted = this.state.map((item) => {
            return item.map((data) => {
              return data == currentOption ? 1 : 0;
            });
          });

          this.putElementHash();
          return this.analyzePlay(formatted);
        });
      });
    });
  }
}
