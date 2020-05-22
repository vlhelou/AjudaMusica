import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioLinkComponent } from './envio-link.component';

describe('EnvioLinkComponent', () => {
  let component: EnvioLinkComponent;
  let fixture: ComponentFixture<EnvioLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
