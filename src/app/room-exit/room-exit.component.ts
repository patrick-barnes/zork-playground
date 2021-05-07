import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-room-exit',
  templateUrl: './room-exit.component.html',
  styleUrls: ['./room-exit.component.css']
})
export class RoomExitComponent implements OnInit {

  @Input() public room: any; // room object, e.g. {"Name":"...","Properties":{...}}
  @Input() public dir: string; // direction property name, e.g. "NORTH"
  public dirLabel: string;
  public bgColor: string;
  public borderColor: string;
  public stringify = JSON.stringify;
  public isArray = Array.isArray;
  public exit: any = null;

  constructor() { }

  ngOnInit(): void {
    if (this.room != null) {
      this.exit = this.room.Exits[this.dir];
      console.log("for " + this.dir + ", this.exit:", this.exit);
    }
    let dirLabelLookup = {
      "NORTH": "n",
      "SOUTH": "s",
      "EAST": "e",
      "WEST": "w"
    };
    this.dirLabel = dirLabelLookup[this.dir] || this.dir.toLowerCase();
    let bgColorLookup = {
      "UEXIT": "#e0ffe0",
      "CEXIT": "#ffffe0",
      "DEXIT": "#ffffe0",
      "FEXIT": "#ffffe0",
      "NEXIT": "inherit"
    };
    let borderColorLookup = {
      "UEXIT": "#80ff80",
      "CEXIT": "#ffff80",
      "DEXIT": "#ffff80",
      "FEXIT": "#ffff80",
      "NEXIT": "inherit"
    };
    if (this.dir == 'HERE') {
      this.bgColor = "white";
      this.borderColor = "#c0c0c0";
    } else if (this.exit) {
      this.bgColor = bgColorLookup[this.exit.TYPE];
      this.borderColor = borderColorLookup[this.exit.TYPE];
    } else {
      this.bgColor = "inherit";
      this.borderColor = "rgba(255,255,255,0.0)";
    }
    console.log("bgColor=" + this.bgColor + ", borderColor=" + this.borderColor);
  }

}
