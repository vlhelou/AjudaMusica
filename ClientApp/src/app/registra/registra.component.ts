import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Entrada } from '../Types/Entrada';
import { EntradaService } from '../Services/entrada.service';

@Component({
  selector: 'app-registra',
  templateUrl: './registra.component.html',
  styleUrls: ['./registra.component.scss']
})
export class RegistraComponent implements OnInit {
  Selecionado: Entrada;
  Mensagem: string;
  Form = new FormGroup({
    Arquivo: new FormControl(''),
  });

  Arquivo = {
    Tipo: null,
    Conteudo: null,
    Nome: null,
    Id: null,
  };
  ArquivoCarregado = false;
  @ViewChild('inputfile') myInputVariable: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private srv: EntradaService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.srv.Busca(params.id).then(p => this.Selecionado = p);
      }
    });

  }

  Grava() {
    this.Arquivo.Id = this.Selecionado.Id;
    this.srv.GravaArquivo(this.Arquivo).then(() => {
      this.Selecionado = null;
      this.Mensagem = 'Obrigado por nos enviar a NF';
    });

  }


  changeListener(event) {
    if (event.target.files.length === 1) {
      let tArquivo: File;
      tArquivo = event.target.files[0];

      const Arquivo = {
        Tipo: null,
        Conteudo: null,
        Id: null
      };

      const flReader = new FileReader();
      // tslint:disable-next-line: only-arrow-functions
      flReader.onload = function (e) {
      };
      flReader.onloadend = () => {
        this.Arquivo.Id = this.Selecionado.Id;
        this.Arquivo.Tipo = tArquivo.type;
        this.Arquivo.Conteudo = flReader.result;
        this.Arquivo.Nome = tArquivo.name;
        this.ArquivoCarregado = true;
      };
      flReader.readAsDataURL(tArquivo);
    }
  }

}
