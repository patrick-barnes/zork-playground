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

  public getRoomCardText(r) {
    if (r.Properties.FDESC) { return r.Properties.FDESC; }
    if (r.Properties.LDESC) { return r.Properties.LDESC; }
    if (r.Properties.ACTION && r.Properties.ACTION[0] && r.Properties.ACTION[0].Atom) {
      return "(described by " + r.Properties.ACTION[0].Atom + ")";
    }
    console.log("WARN: Could not find room description or ACTION for:", r);
    return "";
  }

  public passesFilters(o) {
    return true;
  }

}
