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
  public contains: any[] = [];
  public parentObject: any = null;
  public parentRoomName: any = null;
  public isInitialized: boolean = false;
  public knownProperties: string[] = [
    "#IN",
    "FDESC",
    "LDESC",
    "DESC",
    "TEXT",
    "ADJECTIVE",
    "SYNONYM",
    "FLAGS",
    "ACTION"
  ];

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
        } else {
          if (obj.Properties["#IN"] == this.id) {
            this.contains.push(obj);
          }
        }
      }
      for (let obj of allObjects) {
        if (this.o.Properties["#IN"] == obj.Name) {
          this.parentObject = obj;
        }
      }
      if (!this.o) {
        console.log("Error: object not found.");
      } else if (!this.parentObject) {
        console.log("parentObject not found, probably a room.");
      }
      console.log("this.o:", this.o);
      this.isInitialized = true;
    });
  }

  public getContainsLabel() {
    if (this.hasFlag(this.o, "SURFACEBIT")) {
      return "Sitting on the " + this.o.Properties["DESC"] + " is:";
    }
    if (this.hasFlag(this.o, "ACTORBIT")) {
      return "The " + this.o.Properties["DESC"] + " is holding:";
    }
    return "The " + this.o.Properties["DESC"] + " contains:";
  }

  public getContainerLabel() {
    if (!this.parentObject) {
      // not in an object, but probably in a room
      return "Located in";
    }
    if (this.hasFlag(this.parentObject, "SURFACEBIT")) {
      return "Sitting on";
    }
    if (this.hasFlag(this.parentObject, "ACTORBIT")) {
      return "Held by";
    }
    return "Contained in";
  }

  public hasFlag(obj: any, flag: string) {
    if (!obj.Properties) {
      return false;
    }
    if (!obj.Properties["FLAGS"]) {
      return false;
    }
    for (let objFlag of obj.Properties["FLAGS"]) {
      if (objFlag == flag) {
        return true;
      }
    }
    return false;
  }

  public isKnownProperty(name: string): boolean {
    return this.knownProperties.includes(name);
  }

}
