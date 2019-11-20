import { TestBed } from '@angular/core/testing';

import { GrupoClienteDataService } from './grupo-cliente-data.service';

describe('GrupoClienteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoClienteDataService = TestBed.get(GrupoClienteDataService);
    expect(service).toBeTruthy();
  });
});
