import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropstagesmasterComponent } from './cropstagesmaster.component';

describe('CropstagesmasterComponent', () => {
  let component: CropstagesmasterComponent;
  let fixture: ComponentFixture<CropstagesmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropstagesmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropstagesmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
