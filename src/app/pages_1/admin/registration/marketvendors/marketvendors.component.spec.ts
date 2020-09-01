import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketvendorsComponent } from './marketvendors.component';

describe('MarketvendorsComponent', () => {
  let component: MarketvendorsComponent;
  let fixture: ComponentFixture<MarketvendorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketvendorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketvendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
