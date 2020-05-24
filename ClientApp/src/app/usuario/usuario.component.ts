import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Types/Usuario';
import { UsuarioService } from '../Services/usuario.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  Selecionado: Usuario;
  Lista: Usuario[];
  ShowForm = false;
  Form = new FormGroup({
    Id: new FormControl(),
    Nome: new FormControl('', [Validators.required]),
    Email: new FormControl(''),
    Administrador: new FormControl(''),
    Doador: new FormControl(''),
    Musico: new FormControl(''),
    Comerciante: new FormControl(''),
  });



  constructor(private srv: UsuarioService) { }

  ngOnInit(): void {
    this.srv.Pesquisa({}).then(p => this.Lista = p);
  }

  Edita(item: Usuario) {
    if (item) {
      this.Form.reset(item);
    } else {
      this.Form.reset({
        Id: 0,
        Administrador: false,
        Doador: false,
        Musico: false,
        Comerciante: false

      });
    }
    this.ShowForm = true;
  }

  Grava() {
    this.srv.Grava(this.Form.value).then(q => {
      this.srv.Pesquisa({}).then(p => this.Lista = p);
      this.ShowForm = false;
    })
  }

}
