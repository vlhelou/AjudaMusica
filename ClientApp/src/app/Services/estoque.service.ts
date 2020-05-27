import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estoque } from '../Types/Estoque';

const PathUrl = environment.root + 'api/estoque/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private http: HttpClient) { }

  EntradaItens(id: string): Promise<Estoque[]> {
    const url = PathUrl + `EntradaItens/${id}`;
    return this.http.get<Estoque[]>(url).toPromise<Estoque[]>();
  }

  Grava(item: Estoque): Promise<Estoque> {
    const url = PathUrl + `Grava`;
    return this.http.post<Estoque>(url, item, httpOptions).toPromise<Estoque>();
  }

  Exclui(id: number): Promise<Estoque> {
    const url = PathUrl + `Exclui/${id}`;
    return this.http.get<Estoque>(url).toPromise<Estoque>();
  }

}
