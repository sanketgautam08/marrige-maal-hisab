import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlayerMaalWinner } from './PlayerMaalWinner';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  totalPlayers: number = 0;

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


  public inputNumberOfPlayers(numberOfPlayers: string): void {
    this.totalPlayers = Number(numberOfPlayers);
  }

  checkBoxChanged(winBoxNumber: number): void {
    console.log("Called");

    if(this.win1?.nativeElement.checked != undefined){
      this.win1.nativeElement.checked = false;
    }
    if(this.win2?.nativeElement.checked != undefined){
      this.win2.nativeElement.checked = false;
    }
    if(this.win3?.nativeElement.checked != undefined){
      this.win3.nativeElement.checked = false;
    }
    if(this.win4?.nativeElement.checked != undefined){
      this.win4.nativeElement.checked = false;
    }
    if(this.win5?.nativeElement.checked != undefined){
      this.win5.nativeElement.checked = false;
    }
    if(this.win6?.nativeElement.checked != undefined){
      this.win6.nativeElement.checked = false;
    }

    for (let i of [].constructor(this.totalPlayers)) {

      if (winBoxNumber == 1 && this.win1?.nativeElement.checked == false) {
        this.win1.nativeElement.checked = true;
      }
      if (winBoxNumber == 2 && this.win2?.nativeElement.checked == false) {
        this.win2.nativeElement.checked = true;

      }
      if (winBoxNumber == 3 && this.win3?.nativeElement.checked == false) {
        this.win3.nativeElement.checked = true;

      }
      if (winBoxNumber == 4 && this.win4?.nativeElement.checked == false) {
        this.win4.nativeElement.checked = true;

      }
      if (winBoxNumber == 5 && this.win5?.nativeElement.checked == false) {
        this.win5.nativeElement.checked = true;

      }
      if (winBoxNumber == 6 && this.win6?.nativeElement.checked == false) {
        this.win6.nativeElement.checked = true;

      }
    }
  }

  setPoints(): void {
    this.playerMaalWinner = [];

    if (this.player1 != undefined && this.maal1 != undefined && this.win1 != undefined) {
      this.playerMaalWinner.push(new PlayerMaalWinner(this.player1.nativeElement.value,
        this.maal1.nativeElement.value == "" ? 0 : this.maal1.nativeElement.value,
        this.seen1.nativeElement.checked == undefined ? false : this.seen1.nativeElement.checked,
        this.win1.nativeElement.checked));
    }
    if (this.player2 != undefined && this.maal2 != undefined && this.win2 != undefined) {
      this.playerMaalWinner.push(new PlayerMaalWinner(this.player2.nativeElement.value,
        this.maal2.nativeElement.value == "" ? 0 : this.maal2.nativeElement.value,
        this.seen2.nativeElement.checked == undefined ? false : this.seen2.nativeElement.checked,
        this.win2.nativeElement.checked));
    }
    if (this.player3 != undefined && this.maal3 != undefined && this.win3 != undefined) {
      this.playerMaalWinner.push(new PlayerMaalWinner(this.player3.nativeElement.value,
        this.maal3.nativeElement.value == "" ? 0 : this.maal3.nativeElement.value,
        this.seen3.nativeElement.checked == undefined ? false : this.seen3.nativeElement.checked,
        this.win3.nativeElement.checked));
    }
    if (this.player4 != undefined && this.maal4 != undefined && this.win4 != undefined) {
      this.playerMaalWinner.push(new PlayerMaalWinner(this.player4.nativeElement.value,
        this.maal4.nativeElement.value == "" ? 0 : this.maal4.nativeElement.value,
        this.seen4.nativeElement.checked == undefined ? false : this.seen4.nativeElement.checked,
        this.win4.nativeElement.checked));
    }
    if (this.player5 != undefined && this.maal5 != undefined && this.win5 != undefined) {
      this.playerMaalWinner.push(new PlayerMaalWinner(this.player5.nativeElement.value,
        this.maal5.nativeElement.value == "" ? 0 : this.maal5.nativeElement.value,
        this.seen5.nativeElement.checked == undefined ? false : this.seen5.nativeElement.checked,
        this.win5.nativeElement.checked));
    }
    if (this.player6 != undefined && this.maal6 != undefined && this.win6 != undefined) {
      this.playerMaalWinner.push(new PlayerMaalWinner(this.player1.nativeElement.value,
        this.maal6.nativeElement.value == "" ? 0 : this.maal6.nativeElement.value,
        this.seen6.nativeElement.checked == undefined ? false : this.seen6.nativeElement.checked,
        this.win6.nativeElement.checked));
    }

    console.log(this.playerMaalWinner);
    this.calculatePoints(this.playerMaalWinner);

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
        if (pmw.seen && pmw.maal > 0) {
          let hisab: number = (pmw.maal * playerMaalWinner.length) - (totalMaal + 3);
          if (hisab > 0) {
            this.pointsToAndFrom.push(`${this.winner} to ${pmw.player} ➡️ ${hisab}`);
          }
          else if (hisab < 0) {
            this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ ${hisab}`);
          }
          else {
            this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ ${hisab}`);
          }
        }

        else if (!pmw.seen && (pmw.maal == -10 || pmw.maal == 0)) {
          let hisab = -(totalMaal + 10);
          this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ ${hisab}`);
        }

        else if(pmw.seen && pmw.maal == 0){
          let hisab = -(totalMaal + 3);
          this.pointsToAndFrom.push(`${pmw.player} to ${this.winner} ➡️ ${hisab}`);
        }

      }
    }

  }

}
