import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationmasterComponent } from './preparationmaster.component';

describe('PreparationmasterComponent', () => {
  let component: PreparationmasterComponent;
  let fixture: ComponentFixture<PreparationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreparationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
