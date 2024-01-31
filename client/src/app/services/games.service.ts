import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http : HttpClient) { }

  getGames(){    
    return this.http.get(`${environment.API_URI}/games`);
  }
  getGame(id: string){
    return this.http.get(`${environment.API_URI}/games/${id}`);
  }
  saveGame(game : Game){
    return this.http.post(`${environment.API_URI}/games`, game);
  }
  updateGame(id: string|number|undefined, updatedGame: Game): Observable<Game>{
    return this.http.put(`${environment.API_URI}/games/${id}`, updatedGame);
  }
  deleteGame(id: string){
    return this.http.delete(`${environment.API_URI}/games/${id}`);
  }
}
