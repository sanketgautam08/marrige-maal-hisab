import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlayerMaalWinner } from './PlayerMaalWinner';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @ViewChild('winBox1') win1?: ElementRef["nativeElement"];
  @ViewChild('winBox2') win2?: ElementRef["nativeElement"];
  @ViewChild('winBox3') win3?: ElementRef["nativeElement"];
  @ViewChild('winBox4') win4?: ElementRef["nativeElement"];
  @ViewChild('winBox5') win5?: ElementRef["nativeElement"];
  @ViewChild('winBox6') win6?: ElementRef["nativeElement"];

  @ViewChild('seenBox1') seen1?: ElementRef["nativeElement"];
  @ViewChild('seenBox2') seen2?: ElementRef["nativeElement"];
  @ViewChild('seenBox3') seen3?: ElementRef["nativeElement"];
  @ViewChild('seenBox4') seen4?: ElementRef["nativeElement"];
  @ViewChild('seenBox5') seen5?: ElementRef["nativeElement"];
  @ViewChild('seenBox6') seen6?: ElementRef["nativeElement"];

  @ViewChild('dubleeBox1') dublee1?: ElementRef["nativeElement"];
  @ViewChild('dubleeBox2') dublee2?: ElementRef["nativeElement"];
  @ViewChild('dubleeBox3') dublee3?: ElementRef["nativeElement"];
  @ViewChild('dubleeBox4') dublee4?: ElementRef["nativeElement"];
  @ViewChild('dubleeBox5') dublee5?: ElementRef["nativeElement"];
  @ViewChild('dubleeBox6') dublee6?: ElementRef["nativeElement"];

  @ViewChild('player1') player1?: ElementRef["nativeElement"];
  @ViewChild('player2') player2?: ElementRef["nativeElement"];
  @ViewChild('player3') player3?: ElementRef["nativeElement"];
  @ViewChild('player4') player4?: ElementRef["nativeElement"];
  @ViewChild('player5') player5?: ElementRef["nativeElement"];
  @ViewChild('player6') player6?: ElementRef["nativeElement"];

  @ViewChild('maal1') maal1?: ElementRef["nativeElement"];
  @ViewChild('maal2') maal2?: ElementRef["nativeElement"];
  @ViewChild('maal3') maal3?: ElementRef["nativeElement"];
  @ViewChild('maal4') maal4?: ElementRef["nativeElement"];
  @ViewChild('maal5') maal5?: ElementRef["nativeElement"];
  @ViewChild('maal6') maal6?: ElementRef["nativeElement"];


  playerMaalWinner: PlayerMaalWinner[] = [];
  winner: string = "";
  pointsToAndFrom: string[] = [];

  playerWinnings = new Map<string, number>();
  totalWinnings = new Map<string, number>();
  playersEntered: boolean = false;
  totalHisab: string[] = [];
  gamePoint: number = 1;
  totalPlayers: number = 0;


  public inputNumberOfPlayers(numberOfPlayers: string, gamePoint: string): void {
    this.totalPlayers = Number(numberOfPlayers);
    if (gamePoint == "") {
      this.totalPlayers = 0;
      alert("Enter game points. (Rupees per point)");
    }
    this.gamePoint = Number(gamePoint);
  }

  checkBoxChanged(winBoxNumber: number): void {
    let winList: ElementRef[] = [this.win1, this.win2, this.win3, this.win4, this.win5, this.win6];

    for (let i = 0; i < this.totalPlayers; i++) {
      if (i == winBoxNumber - 1) {
        winList[i].nativeElement.checked = true;
      } else {
        winList[i].nativeElement.checked = false;
      }
    }

  }

  setPoints(): void {

    let playerList: ElementRef[] = [this.player1, this.player2, this.player3, this.player4, this.player5, this.player6];
    let maalList: ElementRef[] = [this.maal1, this.maal2, this.maal3, this.maal4, this.maal5, this.maal6];
    let seenList: ElementRef[] = [this.seen1, this.seen2, this.seen3, this.seen4, this.seen5, this.seen6];
    let dubleeList: ElementRef[] = [this.dublee1, this.dublee2, this.dublee3, this.dublee4, this.dublee5, this.dublee6];
    let winList: ElementRef[] = [this.win1, this.win2, this.win3, this.win4, this.win5, this.win6];

    let winnerSelected = false;
    for (let i = 0; i < this.totalPlayers; i++) {
      if (winList[i].nativeElement.checked) {
        winnerSelected = true;
      }
    }
    if (!winnerSelected) {
      alert("Please select a winner.")
      return;
    }
    this.playerMaalWinner = [];
    this.playerWinnings.clear();
    this.totalHisab = [];


    for (let i = 0; i < this.totalPlayers; i++) {
      this.playerWinnings.set(playerList[i].nativeElement.value, 0);
      this.playerMaalWinner.push(new PlayerMaalWinner(playerList[i].nativeElement.value,
        maalList[i].nativeElement.value == "" ? 0 : maalList[i].nativeElement.value,
        seenList[i].nativeElement.checked,
        dubleeList[i].nativeElement.checked,
        winList[i].nativeElement.checked));
    }

    console.log(this.playerMaalWinner);
    this.calculatePoints(this.playerMaalWinner);
    this.updateWinnings();

    for (let item of this.totalWinnings) {
      if (item[1] >= 0) {
        this.totalHisab.push(`${item[0]} ➡️  Rs.${item[1]}`);
      }
      else {
        this.totalHisab.push(`${item[0]} ➡️  - Rs.${-(item[1])}`);
      }
    }

  }

  calculatePoints(playerMaalWinner: PlayerMaalWinner[]): void {
    this.pointsToAndFrom = [];
    let totalMaal: number = 0;
    for (let pmw of playerMaalWinner) {
      if (pmw.winner) {
        this.winner = pmw.player;
      }

      if (pmw.maal != -10) {
        totalMaal = Number(pmw.maal) + totalMaal;;
      }
    }

    for (let pmw of playerMaalWinner) {

      if (pmw.player != this.winner) {
        let hisab: number = 0;
        if (pmw.seen && pmw.maal >= 0 && pmw.dublee) {
          hisab = (pmw.maal * playerMaalWinner.length) - totalMaal;
          if (hisab > 0) {
            this.pointsToAndFrom.push(`${this.winner} to ${pmw.player} ➡️ Rs.${hisab * this.gamePoint}`);
          }
          else if (hisab < 0) {
            this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ Rs.${-(hisab * this.gamePoint)}`);
          }
          else {
            this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ Rs.${hisab * this.gamePoint}`);
          }
        }
        else if (pmw.seen && pmw.maal > 0) {
          hisab = (pmw.maal * playerMaalWinner.length) - (totalMaal + 3);
          if (hisab > 0) {
            this.pointsToAndFrom.push(`${this.winner} to ${pmw.player} ➡️ Rs.${hisab * this.gamePoint}`);
          }
          else if (hisab < 0) {
            this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ Rs.${-(hisab * this.gamePoint)}`);
          }
          else {
            this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ Rs.${hisab * this.gamePoint}`);
          }
        }

        else if (!pmw.seen && (pmw.maal == -10 || pmw.maal == 0)) {
          hisab = -(totalMaal + 10);
          this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ Rs.${-(hisab * this.gamePoint)}`);
        }

        else if (pmw.seen && pmw.maal == 0) {
          hisab = -(totalMaal + 3);
          this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ Rs.${-(hisab * this.gamePoint)}`);
        }

        this.playerWinnings.set(pmw.player, hisab * this.gamePoint);
        let winnerPreviousWinnings = this.playerWinnings.get(this.winner);
        this.playerWinnings.set(this.winner, -(hisab * this.gamePoint) + (winnerPreviousWinnings != undefined ? winnerPreviousWinnings : 0));


      }
    }

    console.log("Player Winnings", this.playerWinnings);


  }

  seenDublee(seenBox: number): void {
    let seenList: ElementRef[] = [this.seen1, this.seen2, this.seen3, this.seen4, this.seen5, this.seen6];
    let dubleeList: ElementRef[] = [this.dublee1, this.dublee2, this.dublee3, this.dublee4, this.dublee5, this.dublee6];

    dubleeList[seenBox - 1].nativeElement.disabled = !seenList[seenBox - 1].nativeElement.checked;

  }

  resetMaalSeen(): void {
    let maalList: ElementRef[] = [this.maal1, this.maal2, this.maal3, this.maal4, this.maal5, this.maal6];
    let seenList: ElementRef[] = [this.seen1, this.seen2, this.seen3, this.seen4, this.seen5, this.seen6];
    let dubleeList: ElementRef[] = [this.dublee1, this.dublee2, this.dublee3, this.dublee4, this.dublee5, this.dublee6];
    let winList: ElementRef[] = [this.win1, this.win2, this.win3, this.win4, this.win5, this.win6];

    for (let i = 0; i < this.totalPlayers; i++) {
      dubleeList[i].nativeElement.checked = false;
      dubleeList[i].nativeElement.disabled = true;
      seenList[i].nativeElement.checked = false;
      maalList[i].nativeElement.value = "";
      winList[i].nativeElement.checked = false;

    }
  }

  updateWinnings(): void {
    if (this.playersEntered == false) {
      for (let win of this.playerWinnings) {
        this.totalWinnings.set(win[0], win[1]);
      }
      this.playersEntered = true;
    }
    else {
      for (let winnings of this.playerWinnings.entries()) {
        if (this.totalWinnings.has(winnings[0])) {
          let previousWinnings = this.totalWinnings.get(winnings[0]);
          let totalPoints = previousWinnings != undefined ? previousWinnings + winnings[1] : 0;
          this.totalWinnings.set(winnings[0], totalPoints);
        }
        else {
          this.totalWinnings.set(winnings[0], winnings[1]);
        }
      }
    }
    console.log("win this round: ", this.playerWinnings)
    console.log("total wins: ", this.totalWinnings);


  }

  maalCheck(maal: string, maalBoxNumber: number): void {
    let maalList: ElementRef[] = [this.maal1, this.maal2, this.maal3, this.maal4, this.maal5, this.maal6];
    let dubleeList: ElementRef[] = [this.dublee1, this.dublee2, this.dublee3, this.dublee4, this.dublee5, this.dublee6];
    let seenList: ElementRef[] = [this.seen1, this.seen2, this.seen3, this.seen4, this.seen5, this.seen6];
    let winList: ElementRef[] = [this.win1, this.win2, this.win3, this.win4, this.win5, this.win6];

    if (isNaN(+maal) || Number(maal) < 0) {
      maalList[maalBoxNumber - 1].nativeElement.value = "";
      seenList[maalBoxNumber - 1].nativeElement.checked = false;
      dubleeList[maalBoxNumber - 1].nativeElement.checked = false;
      dubleeList[maalBoxNumber - 1].nativeElement.disabled = true;
      winList[maalBoxNumber - 1].nativeElement.checked = false;

      alert("Invalid Maal !!!\nEnter a NUMBER greater than or equal to 0")
    } else {
      seenList[maalBoxNumber - 1].nativeElement.checked = true;
      dubleeList[maalBoxNumber - 1].nativeElement.disabled = false;

    }
  }

}
