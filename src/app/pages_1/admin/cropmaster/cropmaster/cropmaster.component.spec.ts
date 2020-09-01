import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropmasterComponent } from './cropmaster.component';

describe('CropmasterComponent', () => {
  let component: CropmasterComponent;
  let fixture: ComponentFixture<CropmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
