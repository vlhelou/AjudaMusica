import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Entrada } from '../Types/Entrada';
import { PlatformLocation } from '@angular/common';

const PathUrl = environment.root + 'api/entrada/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

let RootApp: string;
@Injectable({
  providedIn: 'root'
})
export class EntradaService {
  constructor(
    private http: HttpClient,
    platformLocation: PlatformLocation) {
    RootApp = (platformLocation as any).location.origin;

  }
  Cria(prm: any): Promise<Entrada> {
    const url = PathUrl + `Cria`;
    return this.http.post<Entrada>(url, prm, httpOptions).toPromise<Entrada>();
  }

  GravaArquivo(prm: any): Promise<Entrada> {
    const url = PathUrl + `GravaArquivo`;
    return this.http.post<Entrada>(url, prm, httpOptions).toPromise<Entrada>();
  }

  ListaPendentes(): Promise<Entrada[]> {
    const url = PathUrl + `ListaPendentes`;
    return this.http.get<Entrada[]>(url).toPromise<Entrada[]>();
  }

  Busca(id: string): Promise<Entrada> {
    const url = PathUrl + `Busca/${id}`;
    return this.http.get<Entrada>(url).toPromise<Entrada>();
  }


  NaoRecebidos(): Promise<Entrada[]> {
    const url = PathUrl + `NaoRecebidos`;
    return this.http.get<Entrada[]>(url).toPromise<Entrada[]>();
  }

  PathDownload(id: string): string {
    return `${PathUrl}Download/${id}`;
  }

  PathRoot(): string {
    return RootApp + '/';
  }

  PathUpload(id: string): string {
    return `${RootApp}/registra/${id}`;
  }


}
