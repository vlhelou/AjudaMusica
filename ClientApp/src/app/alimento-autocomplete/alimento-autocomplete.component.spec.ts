import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentoAutocompleteComponent } from './alimento-autocomplete.component';

describe('AlimentoAutocompleteComponent', () => {
  let component: AlimentoAutocompleteComponent;
  let fixture: ComponentFixture<AlimentoAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentoAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentoAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
