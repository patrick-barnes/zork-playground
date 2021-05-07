import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  public isInitialized: boolean = false;
  public index: any = null;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameDataService.getIndex().subscribe((response: any) => {
      this.index = response;
      this.isInitialized = true;
    });
  }

  onClickGame(gameId: string) {
    this.gameDataService.selectGame(gameId);
  }

  getSelectedGameId() {
    return this.gameDataService.getSelectedGameId();
  }

}
