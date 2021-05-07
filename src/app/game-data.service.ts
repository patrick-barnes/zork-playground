import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  private selectedGameId: string = "zork1";
  private indexCached: any = null;
  private allObjectsCached: any[] = null;
  private allRoomsCached: any[] = null;
  private allRoutinesCached: any[] = null;
  private allSyntaxesCached: any[] = null;

  constructor(private http: HttpClient) { }

  public getIndex() {
    if (this.indexCached != null) {
      console.log("getIndex() returning already-cached:", this.indexCached);
      return of(this.indexCached);
    } else {
      console.log("getIndex() not-yet-cached, fetching...");
      return this.http
        .get("/assets/zil-to-json/data/index.json")
        .pipe(
          map((res: any) => {
            this.indexCached = res;
            console.log("getIndex() returning just-fetched-and-cached:", this.indexCached);
            return this.indexCached;
          }),
          catchError(err => of({})));
    }
  }

  public getAllObjects() {
    if (this.allObjectsCached != null) {
      console.log("getAllObjects() returning already-cached:", this.allObjectsCached);
      return of(this.allObjectsCached);
    } else {
      console.log("getAllObjects() not-yet-cached, fetching...");
      return this.http
        .get("/assets/zil-to-json/data/" + this.selectedGameId + "/objects.json")
        .pipe(
          map((res: any) => {
            this.allObjectsCached = res.sort((o1, o2) => { return o1.Name < o2.Name ? -1 : 1 });
            console.log("getAllObjects() returning just-fetched-and-cached:", this.allObjectsCached);
            return this.allObjectsCached;
          }),
          catchError(err => of([])));
    }
  }

  public getAllRooms() {
    if (this.allRoomsCached != null) {
      console.log("getAllRooms() returning already-cached:", this.allRoomsCached);
      return of(this.allRoomsCached);
    } else {
      console.log("getAllRooms() not-yet-cached, fetching...");
      return this.http
        .get("/assets/zil-to-json/data/" + this.selectedGameId + "/rooms.json")
        .pipe(
          map((res: any) => {
            this.allRoomsCached = res.sort((o1, o2) => { return o1.Name < o2.Name ? -1 : 1 });
            console.log("getAllRooms() returning just-fetched-and-cached:", this.allRoomsCached);
            return this.allRoomsCached;
          }),
          catchError(err => of([])));
    }
  }

  public getAllRoutines() {
    if (this.allRoutinesCached != null) {
      console.log("getAllRoutines() returning already-cached:", this.allRoutinesCached);
      return of(this.allRoutinesCached);
    } else {
      console.log("getAllRoutines() not-yet-cached, fetching...");
      return this.http
        .get("/assets/zil-to-json/data/" + this.selectedGameId + "/routines.json")
        .pipe(
          map((res: any) => {
            this.allRoutinesCached = res.sort((o1, o2) => { return o1.Name < o2.Name ? -1 : 1 });
            console.log("getAllRoutines() returning just-fetched-and-cached:", this.allRoutinesCached);
            return this.allRoutinesCached;
          }),
          catchError(err => of([])));
    }
  }

  public getAllSyntaxes() {
    if (this.allSyntaxesCached != null) {
      console.log("getAllSyntaxes() returning already-cached:", this.allSyntaxesCached);
      return of(this.allSyntaxesCached);
    } else {
      console.log("getAllSyntaxes() not-yet-cached, fetching...");
      return this.http
        .get("/assets/zil-to-json/data/" + this.selectedGameId + "/syntaxes.json")
        .pipe(
          map((res: any) => {
            this.allSyntaxesCached = res.sort((o1, o2) => { return o1.Syntax < o2.Syntax ? -1 : 1 });
            console.log("getAllSyntaxes() returning just-fetched-and-cached:", this.allSyntaxesCached);
            return this.allSyntaxesCached;
          }),
          catchError(err => of([])));
    }
  }
}
