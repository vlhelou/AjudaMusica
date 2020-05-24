import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Services/usuario.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.scss']
})
export class TrocaSenhaComponent implements OnInit {
  Form = new FormGroup({
    Antiga: new FormControl(''),
    Nova: new FormControl(''),
    Nova2: new FormControl(''),
  }, {
    validators: this.SenhaIgual.bind(this)
  });

  constructor(
    private srv: UsuarioService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  Grava() {
    const antiga = this.Form.controls.Antiga.value;
    const nova= this.Form.controls.Nova.value;
    this.srv.TrocaSenha(antiga, nova).then(p => {
      this.Form.reset();
    });
  }

  SenhaIgual(formulario: FormGroup) {
    const { value: password } = formulario.get('Nova');
    const { value: confirmPassword } = formulario.get('Nova2');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
