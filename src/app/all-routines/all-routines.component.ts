import { Component, OnInit } from '@angular/core';
import { GameDataReceiver } from '../game-data-receiver';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-all-routines',
  templateUrl: './all-routines.component.html',
  styleUrls: ['./all-routines.component.css']
})
export class AllRoutinesComponent implements OnInit, GameDataReceiver {

  public isInitialized: boolean = false;
  public allRoutines: any[] = null;
  public allGameData: any = null;
  // TODO: Move this to the game index data
  public foundationRoutines = [
    {"name": "GO", "description": "The routine that starts the game"},
    {"name": "PARSER", "description": "Get input command, handles syntax errors"},
    {"name": "PERFORM", "description": "Delegates command to action routines"},
    {"name": "CLOCKER", "description": "After player turn, lamp burns, sword glows, etc."}
  ];
  public encodeURIComponent = encodeURIComponent;
  public stringify = JSON.stringify;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameDataService.getAllRoutines().subscribe((response: any[]) => {
      this.allRoutines = response;
    });
    this.gameDataService.getAllGameData(this);
  }

  public receiveGameData(allGameData: any): void {
    this.allGameData = allGameData;
    console.log("RECEIVED allGameData:", allGameData);
    this.isInitialized = true;
  }

}
