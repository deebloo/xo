export enum Team {
  X = 'X',
  O = 'O',
  Empty = '.',
  CAT = 'CAT'
}

export class Board {
  private readonly rows = 6;
  private readonly cols = 7;
  private readonly spaces: Team[] = new Array(this.rows * this.cols).fill(
    Team.Empty
  );

  get squares() {
    return [...this.spaces];
  }

  set(row: number, col: number, team: Team): void {
    this.setByIndex(row * this.cols + col, team);
  }

  setByIndex(index: number, team: Team): void {
    this.spaces[index] = team;
  }

  key(): string {
    return this.spaces.join('');
  }

  print(): void {
    const board = this.spaces.reduce((b: string, team: Team, i: number) => {
      if (!(i % this.cols)) {
        b += '\n';
      }

      b += team + ' ';

      return b;
    }, '');

    console.log(board + '\n');
  }

  determineWinner(): Team | undefined {
    let winner: Team;

    // check rows
    for (let i = 0; i < this.cols; i++) {
      const rowStart = i * this.rows;
      const rowEnd = rowStart + this.rows + 1;
      const row = this.spaces.slice(rowStart, rowEnd);

      winner = this.checkList(row);

      if (winner) {
        return winner;
      }
    }

    // check columns
    for (let i = 0; i < this.cols; i++) {
      const col = [];

      for (let x = 0; x < this.rows; x++) {
        col.push(this.spaces[x * this.cols + i]);
      }

      winner = this.checkList(col);

      if (winner) {
        return winner;
      }
    }

    // check diagonals
    for (let i = 0; i < this.spaces.length; i++) {
      // right -> left
      winner = this.checkDiagonal(i, 8);

      if (winner) {
        return winner;
      }

      // left -> right
      winner = this.checkDiagonal(i, 6);

      if (winner) {
        return winner;
      }
    }
  }

  private checkDiagonal(i: number, offset: 6 | 8): Team | undefined {
    const spaces = [];

    for (let x = 0; x < this.rows; x++) {
      spaces.push(this.spaces[i + offset * x]);
    }

    return this.checkList(spaces);
  }

  private checkList(spaces: Team[]): Team | undefined {
    if (spaces.join('').indexOf('XXXX') > -1) {
      return Team.X;
    } else if (spaces.join('').indexOf('OOOO') > -1) {
      return Team.O;
    }
  }
}
