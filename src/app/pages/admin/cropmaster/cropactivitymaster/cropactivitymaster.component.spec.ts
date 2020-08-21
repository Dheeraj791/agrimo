import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropactivitymasterComponent } from './cropactivitymaster.component';

describe('CropactivitymasterComponent', () => {
  let component: CropactivitymasterComponent;
  let fixture: ComponentFixture<CropactivitymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropactivitymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropactivitymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
