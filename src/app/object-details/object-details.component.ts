import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {

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
    this.gameDataService.getAllObjects().subscribe((allObjects) => {
      console.log("allObjects:", allObjects);
      for (let obj of allObjects) {
        if (obj.Name == this.id) {
          this.o = obj;
        }
      }
      if (!this.o) {
        console.log("Error: object not found.");
      }
      console.log("this.o:", this.o);
      this.isInitialized = true;
    });
  }

}
