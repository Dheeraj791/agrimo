import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CropstatusupdateComponent } from './cropstatusupdate.component';

describe('CropstatusupdateComponent', () => {
  let component: CropstatusupdateComponent;
  let fixture: ComponentFixture<CropstatusupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropstatusupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropstatusupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
