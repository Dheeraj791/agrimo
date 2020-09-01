import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmeasurementComponent } from './landmeasurement.component';

describe('LandmeasurementComponent', () => {
  let component: LandmeasurementComponent;
  let fixture: ComponentFixture<LandmeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandmeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
