import { TestBed } from '@angular/core/testing';

import { DialogOrderService } from './dialog-order.service';

describe('DialogOrderService', () => {
  let service: DialogOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
