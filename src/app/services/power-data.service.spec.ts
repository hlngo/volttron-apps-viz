import { TestBed, inject } from '@angular/core/testing';

import { PowerDataService } from './power-data.service';

describe('PowerDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PowerDataService]
    });
  });

  it('should be created', inject([PowerDataService], (service: PowerDataService) => {
    expect(service).toBeTruthy();
  }));
});
