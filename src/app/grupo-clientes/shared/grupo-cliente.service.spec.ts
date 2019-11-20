import { TestBed } from '@angular/core/testing';

import { GrupoClienteService } from './grupo-cliente.service';

describe('GrupoClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoClienteService = TestBed.get(GrupoClienteService);
    expect(service).toBeTruthy();
  });
});
