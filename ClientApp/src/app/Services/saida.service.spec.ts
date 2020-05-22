import { TestBed } from '@angular/core/testing';

import { SaidaService } from './saida.service';

describe('SaidaService', () => {
  let service: SaidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
