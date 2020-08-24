import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QamasterComponent } from './qamaster.component';

describe('QamasterComponent', () => {
  let component: QamasterComponent;
  let fixture: ComponentFixture<QamasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QamasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QamasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
