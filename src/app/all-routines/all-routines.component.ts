import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-all-routines',
  templateUrl: './all-routines.component.html',
  styleUrls: ['./all-routines.component.css']
})
export class AllRoutinesComponent implements OnInit {

  public isInitialized: boolean = false;
  public allRoutines: any[] = null;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameDataService.getAllRoutines().subscribe((response: any[]) => {
      this.allRoutines = response;
      this.isInitialized = true;
    });
  }

}
