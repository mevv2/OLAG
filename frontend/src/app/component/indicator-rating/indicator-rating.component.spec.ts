import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorRatingComponent } from './indicator-rating.component';

describe('IndicatorRatingComponent', () => {
  let component: IndicatorRatingComponent;
  let fixture: ComponentFixture<IndicatorRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
