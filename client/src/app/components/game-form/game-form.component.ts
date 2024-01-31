import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from '../../models/Game';
import { GamesService } from '../../services/games.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent implements OnInit{  
  @HostBinding('class') classes = 'row'; 
  game: Game = { 
    id : 0,
    title : '',
    description: '',
    image: '',
    created_at: new Date()
  };
  edit : boolean = false;

  constructor(private gamesService : GamesService, private router: Router ) {    

  }
  ngOnInit(): void {
    
  }
  saveNewgame(){
    delete this.game.created_at;
    delete this.game.id;
    this.gamesService.saveGame(this.game).subscribe(
      res => {
        this.router.navigate(['/games']);
        this.game.id = 0;
        this.game.description = '';
        this.game.title = '';
        this.game.image = '';        
      },
      err => console.error(err)
    );
  }
}