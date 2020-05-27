import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EntradaService } from '../Services/entrada.service';
import { Entrada } from '../Types/Entrada';
import { Estoque } from '../Types/Estoque';
import { EstoqueService } from '../Services/estoque.service';
import { Alimento } from '../Types/Alimento';

@Component({
  selector: 'app-recebimento',
  templateUrl: './recebimento.component.html',
  styleUrls: ['./recebimento.component.scss']
})
export class RecebimentoComponent implements OnInit {
  Selecionado: Entrada;
  Lista: Entrada[];
  EntradaItens: Estoque[];
  teste: Alimento;

  Form = new FormGroup({
    Id: new FormControl(),
    IdEntrada: new FormControl(),
    IdSaida: new FormControl(),
    IdAutor: new FormControl(),
    Data: new FormControl(),
    Quantidade: new FormControl(),
    Alimento: new FormControl(),
  });

  constructor(
    private entrada: EntradaService,
    private estoque: EstoqueService
  ) { }

  ngOnInit(): void {
    this.entrada.NaoRecebidos().then(p => this.Lista = p);
    this.LimpaForm();
  }

  PathDownload(id: string): string {
    return this.entrada.PathDownload(id);
  }

  LimpaForm() {
    this.Form.reset({
      Id: 0,
      IdSaida: null,
      IdAutor: 0,
      Data: new Date(),
      Quantidade: 0,
      Alimento: null
    });
  }
  DoacaoSelecionado(item: any) {
    this.estoque.EntradaItens(this.Selecionado.Id).then(p => this.EntradaItens = p);
  }

  Exclui(item: Estoque) {
    this.estoque.Exclui(item.Id).then(() => {
      this.estoque.EntradaItens(this.Selecionado.Id).then(p => this.EntradaItens = p);
    });
  }

  Grava() {
    this.Form.controls.IdEntrada.setValue(this.Selecionado.Id);
    this.estoque.Grava(this.Form.value).then(() => {
      this.estoque.EntradaItens(this.Selecionado.Id).then(p => this.EntradaItens = p);
      this.LimpaForm();
    });
  }
}
