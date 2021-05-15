import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-all-games',
  templateUrl: './all-games.component.html',
  styleUrls: ['./all-games.component.css']
})
export class AllGamesComponent implements OnInit {

  public isInitialized: boolean = false;
  public cards: any[] = [
    {
      "imageText": "Rooms",
      "title": "Rooms",
      "description": "All rooms in the game",
      "link": "rooms"
    },
    {
      "imageText": "Objects",
      "title": "Objects",
      "description": "All objects in the game",
      "link": "objects"
    },
    {
      "imageText": "Routines",
      "title": "Routines",
      "description": "All routines in the game",
      "link": "routines"
    },
    {
      "imageText": "Syntaxes",
      "title": "Syntaxes",
      "description": "All commands in the game",
      "link": "syntaxes"
    },
  ];
  public index: any = null;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameDataService.getIndex().subscribe((response: any) => {
      this.index = response;
      this.isInitialized = true;
    });
  }

  getGameIdsSortedByRank() {
    let allKeys = Object.keys(this.index);
    console.log("pre-sort:", allKeys);
    allKeys.sort((a,b)=>{return a["rank"]-b["rank"]});
    console.log("post-sort:", allKeys);
    return allKeys;
  }

  onClickGame(gameId: string) {
    this.gameDataService.setSelectedGameId(gameId);
  }

  getSelectedGameId() {
    return this.gameDataService.getSelectedGameId();
  }

  public getSelectedGameName() {
    let gameId = this.getSelectedGameId();
    return this.index[gameId].name;
  }

}
