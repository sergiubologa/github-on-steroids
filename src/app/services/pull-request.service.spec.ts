import { TestBed } from '@angular/core/testing';

import { PullRequestService } from './pull-request.service';

describe('PullRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PullRequestService = TestBed.get(PullRequestService);
    expect(service).toBeTruthy();
  });
});
