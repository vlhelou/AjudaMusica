import { Component, forwardRef, EventEmitter, Output, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { AlimentoService } from '../Services/alimento.service';
import { Alimento } from '../Types/Alimento';

const noop = () => {
};

@Component({
  selector: 'app-alimento-autocomplete',
  templateUrl: './alimento-autocomplete.component.html',
  styleUrls: ['./alimento-autocomplete.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AlimentoAutocompleteComponent),
    multi: true
  }]
})

export class AlimentoAutocompleteComponent implements ControlValueAccessor {

  lista: Alimento[];
  value = new FormControl();
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

  constructor(private srv: AlimentoService) {
    this.value.valueChanges.subscribe(entrada => {
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
    // console.log(event);
    // console.log(event.option.value);
    if (event) {
      this.change.emit(event);
      this.innerValue = event;
      this.onChangeCallback(event);
    } 
  }



  displayFn(user?: any): string | undefined {
    return user ? user.Nome : undefined;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.value.setValue(value);
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
