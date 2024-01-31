import { Game } from '../../models/Game';
import { GamesService } from './../../services/games.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {

  faCoffe = faCoffee;
  @HostBinding('class') classes = 'row';
  games: any = { };

  constructor(private gamesService : GamesService) { }

  ngOnInit(): void {
    this.getGames();    
  }

  getGames(){
    this.gamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.log(err)    
    );
  }
  deleteGame(id:string){
    this.gamesService.deleteGame(id).subscribe(
      res => {
        this.getGames();
      },
      err => console.error(err)
    );    
  }
  editGame(id: string){
    console.log('Game list',id);
  }
}