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
