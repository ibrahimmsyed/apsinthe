import { TestBed, inject } from '@angular/core/testing';

import { UniqueDataService } from './unique-data.service';

describe('UniqueDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniqueDataService]
    });
  });

  it('should be created', inject([UniqueDataService], (service: UniqueDataService) => {
    expect(service).toBeTruthy();
  }));
});
