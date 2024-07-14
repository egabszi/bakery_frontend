import { TestBed } from '@angular/core/testing';

import { MenuBackendService } from './menu-backend.service';

describe('MenuBackendService', () => {
  let service: MenuBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
