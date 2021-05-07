import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-routine-details',
  templateUrl: './routine-details.component.html',
  styleUrls: ['./routine-details.component.css']
})
export class RoutineDetailsComponent implements OnInit {

  public stringify = JSON.stringify;
  public id: string = null;
  public o: any = null;
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
    this.gameDataService.getAllRoutines().subscribe((allRoutines) => {
      console.log("allRoutines:", allRoutines);
      for (let o of allRoutines) {
        if (o.Name == this.id) {
          this.o = o;
        }
      }
      if (!this.o) {
        console.log("Error: routine not found.");
      }
      console.log("this.o:", this.o);
      this.isInitialized = true;
    });
  }

}
