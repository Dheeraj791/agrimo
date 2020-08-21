import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropfamilymasterComponent } from './cropfamilymaster.component';

describe('CropfamilymasterComponent', () => {
  let component: CropfamilymasterComponent;
  let fixture: ComponentFixture<CropfamilymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropfamilymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropfamilymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
