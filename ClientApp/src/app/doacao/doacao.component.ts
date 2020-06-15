import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from '../Services/usuario.service';
import { SaidaService } from '../Services/saida.service';
import { Usuario } from '../Types/Usuario';
import { EstoqueService } from '../Services/estoque.service';

@Component({
  selector: 'app-doacao',
  templateUrl: './doacao.component.html',
  styleUrls: ['./doacao.component.scss']
})
export class DoacaoComponent implements OnInit {

  Saldos: any[];
  Form = new FormGroup({
    Comerciante: new FormControl(),
    Musico: new FormControl(),
  });


  constructor(
    private usr: UsuarioService,
    private saida: SaidaService,
    private estoque: EstoqueService
  ) { }

  ngOnInit(): void {
  }

  BuscaSaldo(item: Usuario) {
    console.log(item);
    if (item) {
      if (item.Id) {
        this.estoque.SaldoPorComerciante(item.Id).then(p => this.Saldos = p);
      }
      else {
      this.Saldos = [];
      }
    } else {
      this.Saldos = [];
    }
  }

  SelecionaAlimento(item) {

  }
}
