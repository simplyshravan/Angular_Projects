import { TestBed } from '@angular/core/testing';

import { RssfeedService } from './rssfeed.service';

describe('RssfeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RssfeedService = TestBed.get(RssfeedService);
    expect(service).toBeTruthy();
  });
});
