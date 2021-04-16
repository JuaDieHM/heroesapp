import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  terminoBusqueda: string = '';
  listadoHeroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesServices: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesServices.getSugerencias(this.terminoBusqueda.trim())
                            .subscribe(
                                res => { this.listadoHeroes = res });
  }

  opcionSeleccionada( evento : MatAutocompleteSelectedEvent ) {

    if(!evento.option.value){
      this.heroeSeleccionado = undefined;
    } else {
      const heroe : Heroe = evento.option.value;
      this.terminoBusqueda = heroe.superhero;
      this.heroesServices.getHeroePorId(heroe.id!)
                            .subscribe(res => this.heroeSeleccionado = res );
    }
   }
}
