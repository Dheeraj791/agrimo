import { TestBed } from '@angular/core/testing';

import { MasterRecordService } from './master-record.service';

describe('MasterRecordService', () => {
  let service: MasterRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
