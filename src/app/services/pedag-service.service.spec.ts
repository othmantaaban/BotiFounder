import { TestBed } from '@angular/core/testing';

import { PedagServiceService } from './pedag-service.service';

describe('PedagServiceService', () => {
  let service: PedagServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedagServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
