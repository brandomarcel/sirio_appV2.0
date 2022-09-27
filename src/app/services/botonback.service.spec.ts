import { TestBed } from '@angular/core/testing';

import { BotonbackService } from './botonback.service';

describe('BotonbackService', () => {
  let service: BotonbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotonbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
