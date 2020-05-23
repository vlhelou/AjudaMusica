import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { UsuarioService } from './Services/usuario.service';
import { Usuario } from './Types/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Usuario: any;
  EntradaLogin = false;
  Form = new FormGroup({
    Usuario: new FormControl('', [Validators.required]),
    Senha: new FormControl('', [Validators.required])
  });

  constructor(private srv: UsuarioService) {
    this.srv.currentUser.subscribe(p => this.Usuario = p);
  }

  AbreLogin() {
    this.EntradaLogin = true;
  }
  Login() {
    // console.log(this.Form.value);
    this.srv.Login(this.Form.value).subscribe(p => {
      this.EntradaLogin = false;
    });
  }

  Sair(){
    this.srv.Logout();
  }
}
