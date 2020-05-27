import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';


import { EntradaService } from '../Services/entrada.service';
import { Entrada } from '../Types/Entrada';

@Component({
  selector: 'app-envio-link',
  templateUrl: './envio-link.component.html',
  styleUrls: ['./envio-link.component.scss']
})
export class EnvioLinkComponent implements OnInit {
  Form = new FormGroup({
    Doador: new FormControl(''),
    Comerciante: new FormControl(null, [Validators.required]),
  });
  Lista: Entrada[];
  PathRoot: string;
  constructor(
    private srv: EntradaService,
  ) { }

  ngOnInit(): void {
    this.srv.ListaPendentes().then(p => this.Lista = p);
    // this.PathRoot = this.srv.PathRoot();
  }

  PathUpload(id: string): string {
    return this.srv.PathUpload(id);
  }

  Grava() {
    this.srv.Cria(this.Form.value).then(() => {
      this.Form.reset();
      this.srv.ListaPendentes().then(p => this.Lista = p);
    });
  }
}
