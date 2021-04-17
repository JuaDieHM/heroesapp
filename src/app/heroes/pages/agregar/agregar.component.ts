import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }

  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe : Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  constructor( private heroeService: HeroesService,
                private activeRoutes : ActivatedRoute,
                private router: Router,
                private snackBar: MatSnackBar,
                private dialog: MatDialog ) { }

  ngOnInit(): void {

    if (!this.router.url.includes('editar')) {
      return ;
    }

    this.activeRoutes.params
            .pipe( switchMap( response => this.heroeService.getHeroePorId(response.id)))
            .subscribe( heroe => this.heroe = heroe );
  }

  guardarHeroe() {
    if(this.heroe.superhero.trim().length === 0){
      return ;
    }

    if(this.heroe.id ) {
      this.heroeService.actualizarHeroe(this.heroe)
                        .subscribe(response => {this.mostrarAlerta('Registro Actualizado')});
    } else {
      this.heroeService.agregarHeroe(this.heroe).subscribe( response => {
          this.router.navigate(['/heroes/editar', response.id]);
          this.mostrarAlerta('Registro Creado');
      });

    }
  }

  borrarHeroe() {
    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe }
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if(result) {
            this.heroeService.eliminarHeroe(this.heroe.id!).subscribe(reponse => {
              this.router.navigate(['/heroes']);
            })
        }
      }
    );


  }

  mostrarAlerta(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok', {
      duration: 2500
    });
  }

}
