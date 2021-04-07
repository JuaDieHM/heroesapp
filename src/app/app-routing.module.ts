import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

// Declaramos las rutas
const routes: Routes = [
  // Defino la ruta a mi auth module
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
                          .then( module => module.AuthModule )
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module')
                          .then(module => module.HeroesModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
//    component: ErrorPageComponent
    redirectTo: '404'
  }
];


@NgModule({
  // Importo el modulo para las rutas principales
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
