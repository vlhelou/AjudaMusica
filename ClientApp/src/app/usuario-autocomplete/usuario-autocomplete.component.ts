import { Component, forwardRef, EventEmitter, Output, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Usuario } from '../Types/Usuario';
import { UsuarioService } from '../Services/usuario.service';

const noop = () => {
};

@Component({
  selector: 'app-usuario-autocomplete',
  templateUrl: './usuario-autocomplete.component.html',
  styleUrls: ['./usuario-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UsuarioAutocompleteComponent),
    multi: true
  }]
})
export class UsuarioAutocompleteComponent implements ControlValueAccessor {

  lista: Usuario[];
  valor = new FormControl();
  private filtro: any;

  private innerValue: any;
  @Input() Titulo: string;
  @Input() required: any;
  @Input('Filtro')
  set Filtro(value: any) {
    this.filtro = value;
  }

  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter();
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private srv: UsuarioService) {

    this.valor.valueChanges.subscribe(entrada => {
      this.lista = [];
      if (typeof entrada === 'string' && entrada.trim() !== '') {
        this.filtro.Nome = entrada.trim();
        this.srv.Pesquisa(this.filtro).then(p => this.lista = p);
        if (this.required) {
          this.innerValue = null;
        } else {

          this.change.emit(entrada);
          this.innerValue = entrada;
          this.onChangeCallback(entrada);

        }
      }
    });
  }


  ItemSelecionado(event) {
    if (event.option.value) {
      this.change.emit(event.option.value);
      this.innerValue = event.option.value;
      this.onChangeCallback(event.option.value);
    }
  }


  displayFn(user?: any): string | undefined {
    return user ? user.Nome : undefined;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.valor.setValue(value);
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }


}
