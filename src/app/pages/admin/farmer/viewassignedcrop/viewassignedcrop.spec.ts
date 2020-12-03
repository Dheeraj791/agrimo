import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ViewassignedcropComponent } from './viewassignedcrop.component';

describe('CropfamilymasterComponent', () => {
  let component: ViewassignedcropComponent;
  let fixture: ComponentFixture<ViewassignedcropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewassignedcropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewassignedcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
