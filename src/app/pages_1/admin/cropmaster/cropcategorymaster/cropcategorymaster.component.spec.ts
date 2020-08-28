import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropcategorymasterComponent } from './cropcategorymaster.component';

describe('CropcategorymasterComponent', () => {
  let component: CropcategorymasterComponent;
  let fixture: ComponentFixture<CropcategorymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropcategorymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropcategorymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
