import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../Services/alimento.service';
import { Alimento } from '../Types/Alimento';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.scss']
})
export class AlimentoComponent implements OnInit {
  Lista: Alimento[];
  Selecionado: Alimento;
  Form = new FormGroup({
    Id: new FormControl(),
    Nome: new FormControl('', [Validators.required]),
  });

  ShowForm = false;
  constructor(private srv: AlimentoService) { }

  ngOnInit(): void {
    this.srv.Pesquisa({}).then(p => this.Lista = p);
  }

  Edita(item: Alimento) {
    if (item) {
      this.Selecionado = item;
      this.Form.reset(item);
    } else {
      this.Selecionado = null;
      this.Form.reset({ Id: 0 });
    }
    this.ShowForm = true;
  }

  Grava() {
    this.srv.Grava(this.Form.value).then(q => {
      this.srv.Pesquisa({}).then(p => this.Lista = p);
      this.ShowForm = false;
    });
  }

  Exclui() {
    this.srv.Exclui(this.Selecionado.Id).then(q => {
      this.srv.Pesquisa({}).then(p => this.Lista = p);
      this.ShowForm = false;
    });
  }
}
