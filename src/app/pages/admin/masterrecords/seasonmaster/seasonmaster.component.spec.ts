import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonmasterComponent } from './seasonmaster.component';

describe('SeasonmasterComponent', () => {
  let component: SeasonmasterComponent;
  let fixture: ComponentFixture<SeasonmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
