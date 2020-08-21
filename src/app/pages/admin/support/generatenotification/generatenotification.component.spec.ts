import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratenotificationComponent } from './generatenotification.component';

describe('GeneratenotificationComponent', () => {
  let component: GeneratenotificationComponent;
  let fixture: ComponentFixture<GeneratenotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratenotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratenotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
