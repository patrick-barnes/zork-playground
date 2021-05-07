import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  public stringify = JSON.stringify;
  public id: string = null;
  public r: any = null;
  public isInitialized: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameDataService: GameDataService) {
    //console.log("router url:", this.router.url);
    this.id = route.snapshot.params["id"];
    console.log("this.selectedId:", this.id);
  }

  ngOnInit(): void {
    this.gameDataService.getAllRooms().subscribe((allRooms) => {
      console.log("allRooms:", allRooms);
      for (let obj of allRooms) {
        if (obj.Name == this.id) {
          this.r = obj;
        }
      }
      if (!this.r) {
        console.log("Error: object not found.");
      }
      console.log("this.r:", this.r);
      this.isInitialized = true;
    });
  }

  public getFriendlyExitType(t: string) {
    if (t == 'UEXIT') return "Normal";
    if (t == 'NEXIT') return "Non-Exit";
    if (t == 'DEXIT') return "Door Exit";
    if (t == 'CEXIT') return "Conditional";
    if (t == 'FEXIT') return "Function";
  }

  public shouldIgnoreProperty(n: string) {
    if (['#IN', 'NORTH', 'SOUTH', 'EAST', 'WEST', 'NW', 'NE', 'SW', 'SE', 'UP', 'DOWN', 'IN', 'OUT'].includes(n)) {
      return true;
    }
    return false;
  }

}
