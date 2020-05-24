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
  valor = new FormControl();
  private filtro: any;

  private innerValue: Alimento;
  @Input() Titulo: string;
  @Input() required: any;
  @Input('Filtro')
  set Filtro(value: any) {
    this.filtro = value;
  }

  // tslint:disable-next-line: no-output-native
  @Output() change = new EventEmitter();
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: Alimento) => void = noop;

  constructor(private srv: AlimentoService) {

    this.valor.valueChanges.subscribe(q => {
      this.lista = [];
      if (typeof q === 'string' && q.trim() !== '') {
        this.filtro.Chave = q.trim();
        this.srv.Pesquisa(this.filtro).then(p => this.lista = p);
      } else {
        if (typeof q === 'object') {
          this.change.emit(q);
          this.innerValue = q;
          this.onChangeCallback(q);
        }
      }
    });
  }


  displayFn(user?: any): string | undefined {
    return user ? user.Nome : undefined;
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
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
