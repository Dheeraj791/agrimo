import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrrigationmasterComponent } from './irrigationmaster.component';

describe('IrrigationmasterComponent', () => {
  let component: IrrigationmasterComponent;
  let fixture: ComponentFixture<IrrigationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrrigationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrrigationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
