import { TestBed } from '@angular/core/testing';

import { SubirarchivoService } from './subirarchivo.service';

describe('SubirarchivoService', () => {
  let service: SubirarchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubirarchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
