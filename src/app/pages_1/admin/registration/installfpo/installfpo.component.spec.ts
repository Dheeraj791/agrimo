import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallfpoComponent } from './installfpo.component';

describe('InstallfpoComponent', () => {
  let component: InstallfpoComponent;
  let fixture: ComponentFixture<InstallfpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallfpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallfpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
