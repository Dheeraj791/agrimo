import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasemasterComponent } from './diseasemaster.component';

describe('DiseasemasterComponent', () => {
  let component: DiseasemasterComponent;
  let fixture: ComponentFixture<DiseasemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiseasemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
