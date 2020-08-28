import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantationmasterComponent } from './plantationmaster.component';

describe('PlantationmasterComponent', () => {
  let component: PlantationmasterComponent;
  let fixture: ComponentFixture<PlantationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
