import { Component, Input } from '@angular/core';
import { PlayerMaalWinner } from '../PlayerMaalWinner';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent {

  @Input() allPoints: string [] = [];
  @Input() winner: string = ""; 


  // showResult(){
  //   for(var pmw of this.playerMaalWinner){
  //     if(pmw.winner){
  //       this.winner = pmw.player;
  //     }
  //   }
  // }


}
