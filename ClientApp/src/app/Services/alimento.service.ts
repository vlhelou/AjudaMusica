import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alimento } from '../Types/Alimento';

const PathUrl = environment.root + 'api/alimento/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  constructor(private http: HttpClient) { }

  Grava(item: Alimento): Promise<Alimento> {
    const url = PathUrl + `Grava`;
    return this.http.post<Alimento>(url, item, httpOptions).toPromise<Alimento>();
  }


  Busca(id: number): Promise<Alimento> {
    const url = PathUrl + `Busca/${id}`;
    return this.http.get<Alimento>(url).toPromise<Alimento>();
  }

  Exclui(id: number): Promise<void> {
    const url = PathUrl + `Exclui/${id}`;
    return this.http.get<void>(url).toPromise<void>();
  }

  Pesquisa(prm: any): Promise<Alimento[]> {
    const url = PathUrl + `Pesquisa`;
    return this.http.post<Alimento[]>(url, prm, httpOptions).toPromise<Alimento[]>();
  }

}
