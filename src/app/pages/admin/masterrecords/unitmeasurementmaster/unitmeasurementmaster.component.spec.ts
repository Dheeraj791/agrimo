import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitmeasurementmasterComponent } from './unitmeasurementmaster.component';

describe('UnitmeasurementmasterComponent', () => {
  let component: UnitmeasurementmasterComponent;
  let fixture: ComponentFixture<UnitmeasurementmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitmeasurementmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitmeasurementmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
