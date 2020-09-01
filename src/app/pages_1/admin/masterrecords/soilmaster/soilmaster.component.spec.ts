import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilmasterComponent } from './soilmaster.component';

describe('SoilmasterComponent', () => {
  let component: SoilmasterComponent;
  let fixture: ComponentFixture<SoilmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoilmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoilmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
