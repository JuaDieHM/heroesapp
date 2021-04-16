import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  listadoHeroes : Heroe[] = [];

  constructor(private heroesService : HeroesService) { }

  ngOnInit(): void {
    this.heroesService.listarHeroes()
                          .subscribe( res => {
                            this.listadoHeroes = res;
                          });
  }

}
