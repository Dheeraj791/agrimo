import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulchmasterComponent } from './mulchmaster.component';

describe('MulchmasterComponent', () => {
  let component: MulchmasterComponent;
  let fixture: ComponentFixture<MulchmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulchmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulchmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
