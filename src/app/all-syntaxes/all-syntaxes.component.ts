import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../game-data.service';

@Component({
  selector: 'app-all-syntaxes',
  templateUrl: './all-syntaxes.component.html',
  styleUrls: ['./all-syntaxes.component.css']
})
export class AllSyntaxesComponent implements OnInit {

  public isInitialized: boolean = false;
  public allSyntaxes: any[] = null;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.gameDataService.getAllSyntaxes().subscribe((response: any[]) => {
      this.allSyntaxes = response;
      this.isInitialized = true;
    });
  }

}
