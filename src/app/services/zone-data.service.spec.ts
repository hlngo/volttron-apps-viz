import { TestBed, inject } from '@angular/core/testing';

import { ZoneDataService } from './zone-data.service';

describe('ZoneDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoneDataService]
    });
  });

  it('should be created', inject([ZoneDataService], (service: ZoneDataService) => {
    expect(service).toBeTruthy();
  }));
});
