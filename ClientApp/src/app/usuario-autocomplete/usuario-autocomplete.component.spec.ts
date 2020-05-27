import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAutocompleteComponent } from './usuario-autocomplete.component';

describe('UsuarioAutocompleteComponent', () => {
  let component: UsuarioAutocompleteComponent;
  let fixture: ComponentFixture<UsuarioAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
