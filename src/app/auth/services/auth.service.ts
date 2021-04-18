import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = environment.baseUrl;
  private _auth : Auth | undefined;

  constructor(private httpClient: HttpClient) { }


  get obtenerAuth() : Auth {
    return {...this._auth! };
  }


  verificaAutenticacion() : Observable<boolean> {
    if (!localStorage.getItem('IdToken')) {
      return of(false);
    }

    return this.httpClient.get<Auth>(`${this.urlBase}/usuarios/1`)
                          .pipe(
                            map( res => {
                              this._auth = res;
                              return true;
                            })
                          );

  }

  login() {
    return this.httpClient.get<Auth>(`${this.urlBase}/usuarios/1`)
                            .pipe( tap(res => this._auth = res ),
                                  tap(res => localStorage.setItem('IdToken', res.id )));
            }


  logout() {
    this._auth = undefined;
    localStorage.removeItem('IdToken');
  }

}
