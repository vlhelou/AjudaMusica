import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Usuario } from '../Types/Usuario';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const PathUrl = environment.root + 'api/usuario/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  Login(credencial: any): Observable<any> {
    const url = PathUrl + 'login';
    return this.http.post<any>(url, credencial, httpOptions)
      .pipe(map(user => {
        if (user && user.Token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
      }));
  }

  Logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/home');
  }

  Grava(item: Usuario): Promise<Usuario> {
    const url = PathUrl + `Grava`;
    return this.http.post<Usuario>(url, item, httpOptions).toPromise<Usuario>();
  }

  TrocaSenha(antiga: string, nova: string) {
    const prm = {
      Antiga: antiga,
      Nova: nova
    };
    const url = PathUrl + `TrocaSenha`;
    return this.http.post<void>(url, prm, httpOptions).toPromise<void>();
  }

  Busca(id: number): Promise<Usuario> {
    const url = PathUrl + `Busca/${id}`;
    return this.http.get<Usuario>(url).toPromise<Usuario>();
  }

  Pesquisa(prm: any): Promise<Usuario[]> {
    const url = PathUrl + `Pesquisa`;
    return this.http.post<Usuario[]>(url, prm, httpOptions).toPromise<Usuario[]>();
  }


}
