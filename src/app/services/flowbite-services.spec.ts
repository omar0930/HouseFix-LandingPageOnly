import { TestBed } from '@angular/core/testing';

import { FlowbiteServices } from './flowbite-services';

describe('FlowbiteServices', () => {
  let service: FlowbiteServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbiteServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
