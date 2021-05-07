import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  public isInitialized: boolean = false;
  public allRooms: any[] = null;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameDataService.getAllRooms().subscribe((response: any[]) => {
      this.allRooms = response;
      this.isInitialized = true;
    });
  }

  public passesFilters(o) {
    return true;
  }

}
